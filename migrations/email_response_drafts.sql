-- Email Response Drafts Migration
-- This migration creates a table to store AI-generated email response drafts

-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the email_response_drafts table
CREATE TABLE IF NOT EXISTS "email_response_drafts" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "email_id" TEXT NOT NULL,
  "thread_id" TEXT NOT NULL,
  "original_subject" TEXT NOT NULL,
  "draft_text" TEXT NOT NULL,
  "suggested_subject" TEXT,
  "reply_to_all" BOOLEAN NOT NULL DEFAULT false,
  "requires_review" BOOLEAN NOT NULL DEFAULT true,
  "status" TEXT NOT NULL DEFAULT 'pending_review',
  "sent_at" TIMESTAMP WITH TIME ZONE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS "email_response_drafts_user_id_idx" ON "email_response_drafts" ("user_id");
CREATE INDEX IF NOT EXISTS "email_response_drafts_status_idx" ON "email_response_drafts" ("status");
CREATE INDEX IF NOT EXISTS "email_response_drafts_email_id_idx" ON "email_response_drafts" ("email_id");
CREATE INDEX IF NOT EXISTS "email_response_drafts_thread_id_idx" ON "email_response_drafts" ("thread_id");

-- Enable Row Level Security
ALTER TABLE "email_response_drafts" ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can view their own email response drafts"
  ON "email_response_drafts" FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own email response drafts"
  ON "email_response_drafts" FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role can manage all drafts
CREATE POLICY "Service role can manage all email response drafts"
  ON "email_response_drafts" USING (auth.role() = 'service_role');

-- Add the table to realtime publication if needed
ALTER PUBLICATION supabase_realtime ADD TABLE "email_response_drafts";

-- Comment on table and columns for documentation
COMMENT ON TABLE "email_response_drafts" IS 'Stores AI-generated email response drafts pending user review';
COMMENT ON COLUMN "email_response_drafts"."email_id" IS 'Original email ID being responded to';
COMMENT ON COLUMN "email_response_drafts"."thread_id" IS 'Email thread ID for conversation tracking';
COMMENT ON COLUMN "email_response_drafts"."draft_text" IS 'AI-generated response text';
COMMENT ON COLUMN "email_response_drafts"."suggested_subject" IS 'Optional AI-suggested subject line';
COMMENT ON COLUMN "email_response_drafts"."reply_to_all" IS 'Whether the response should be sent to all recipients';
COMMENT ON COLUMN "email_response_drafts"."requires_review" IS 'Whether human review is required before sending';
COMMENT ON COLUMN "email_response_drafts"."status" IS 'Current status (pending_review, approved, sent, rejected)';