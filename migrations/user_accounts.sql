-- User Accounts Migration
-- This migration creates a user_accounts table to store authentication keys,
-- tool permissions, and usage credits for users.

-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the user_accounts table
CREATE TABLE IF NOT EXISTS "user_accounts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Auth providers and their tokens/keys
  "auth_providers" JSONB DEFAULT '{}'::jsonb,
  -- Example structure:
  -- {
  --   "google": {
  --     "access_token": "string",
  --     "refresh_token": "string",
  --     "expires_at": "timestamp",
  --     "scopes": ["string"]
  --   },
  --   "office365": { ... },
  --   "telegram": { ... }
  -- }
  
  -- Tool permissions
  "enabled_tools" TEXT[] DEFAULT '{}'::text[],
  
  -- Credits system
  "total_credits" INTEGER DEFAULT 0,
  "used_credits" INTEGER DEFAULT 0,
  "subscription_tier" TEXT DEFAULT 'free',
  "subscription_expires_at" TIMESTAMP WITH TIME ZONE,
  
  -- Additional user preferences
  "preferences" JSONB DEFAULT '{}'::jsonb,
  
  -- Constraints
  CONSTRAINT "used_credits_within_total" CHECK (used_credits <= total_credits),
  CONSTRAINT "unique_user_id" UNIQUE ("user_id")
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS "user_accounts_user_id_idx" ON "user_accounts" ("user_id");
CREATE INDEX IF NOT EXISTS "user_accounts_auth_providers_idx" ON "user_accounts" USING GIN ("auth_providers");
CREATE INDEX IF NOT EXISTS "user_accounts_enabled_tools_idx" ON "user_accounts" USING GIN ("enabled_tools");

-- Enable Row Level Security
ALTER TABLE "user_accounts" ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can view their own account"
  ON "user_accounts" FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own account"
  ON "user_accounts" FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all accounts"
  ON "user_accounts" USING (auth.role() = 'service_role');

-- No automatic triggers or functions
-- The application code will handle:
-- 1. Setting updated_at timestamps
-- 2. Creating user accounts when needed
-- This prevents duplicate records and gives more control to the application

-- Add the table to realtime publication if needed
ALTER PUBLICATION supabase_realtime ADD TABLE "user_accounts";

-- Comment on table and columns for documentation
COMMENT ON TABLE "user_accounts" IS 'Stores authentication keys, tool permissions, and credits for users';
COMMENT ON COLUMN "user_accounts"."auth_providers" IS 'JSON object containing authentication tokens and keys for different providers';
COMMENT ON COLUMN "user_accounts"."enabled_tools" IS 'Array of tool identifiers that the user is allowed to use';
COMMENT ON COLUMN "user_accounts"."total_credits" IS 'Total number of credits available to the user';
COMMENT ON COLUMN "user_accounts"."used_credits" IS 'Number of credits already used by the user';

-- Auto-create user_accounts row on user creation
CREATE OR REPLACE FUNCTION create_user_account()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_accounts WHERE user_id = NEW.id) THEN
    INSERT INTO public.user_accounts (user_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_account();

-- Grant permissions to supabase_auth_admin
GRANT INSERT, SELECT, UPDATE, DELETE ON TABLE public.user_accounts TO supabase_auth_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO supabase_auth_admin;

-- Allow service role to insert any row
CREATE POLICY "Service role can insert all accounts"
  ON public.user_accounts
  FOR INSERT
  TO supabase_auth_admin
  WITH CHECK (true);