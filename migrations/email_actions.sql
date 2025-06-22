-- Email Actions Migration
-- This migration creates a table to store actions to be performed on emails

-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the email_actions table
CREATE TABLE IF NOT EXISTS "email_actions" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "email_id" TEXT NOT NULL,
  "account_id" TEXT NOT NULL,
  "action_type" TEXT NOT NULL,
  "action_details" JSONB NOT NULL DEFAULT '{}'::jsonb,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "requires_approval" BOOLEAN NOT NULL DEFAULT false,
  "executed_at" TIMESTAMP WITH TIME ZONE,
  "error_message" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS "email_actions_user_id_idx" ON "email_actions" ("user_id");
CREATE INDEX IF NOT EXISTS "email_actions_status_idx" ON "email_actions" ("status");
CREATE INDEX IF NOT EXISTS "email_actions_action_type_idx" ON "email_actions" ("action_type");
CREATE INDEX IF NOT EXISTS "email_actions_email_id_idx" ON "email_actions" ("email_id");
CREATE INDEX IF NOT EXISTS "email_actions_account_id_idx" ON "email_actions" ("account_id");
CREATE INDEX IF NOT EXISTS "email_actions_action_details_idx" ON "email_actions" USING GIN ("action_details");

-- Enable Row Level Security
ALTER TABLE "email_actions" ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can view their own email actions"
  ON "email_actions" FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own email actions"
  ON "email_actions" FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role can manage all actions
CREATE POLICY "Service role can manage all email actions"
  ON "email_actions" USING (auth.role() = 'service_role');

-- Add the table to realtime publication if needed
ALTER PUBLICATION supabase_realtime ADD TABLE "email_actions";

-- Comment on table and columns for documentation
COMMENT ON TABLE "email_actions" IS 'Stores actions to be performed on emails as determined by the AI processing pipeline';
COMMENT ON COLUMN "email_actions"."email_id" IS 'ID of the email to perform action on';
COMMENT ON COLUMN "email_actions"."account_id" IS 'ID of the email account to use for the action';
COMMENT ON COLUMN "email_actions"."action_type" IS 'Type of action (MARK_READ, ARCHIVE, LABEL, etc.)';
COMMENT ON COLUMN "email_actions"."action_details" IS 'JSON details specific to the action type';
COMMENT ON COLUMN "email_actions"."status" IS 'Current status (pending, approved, executed, failed, rejected)';
COMMENT ON COLUMN "email_actions"."requires_approval" IS 'Whether user approval is required before executing';