-- Email Extracted Tasks Migration
-- This migration creates a table to store tasks extracted from emails

-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the email_extracted_tasks table
CREATE TABLE IF NOT EXISTS "email_extracted_tasks" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "email_id" TEXT NOT NULL,
  "email_subject" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "deadline" TIMESTAMP WITH TIME ZONE,
  "assignee" TEXT,
  "priority" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "completed_at" TIMESTAMP WITH TIME ZONE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS "email_extracted_tasks_user_id_idx" ON "email_extracted_tasks" ("user_id");
CREATE INDEX IF NOT EXISTS "email_extracted_tasks_status_idx" ON "email_extracted_tasks" ("status");
CREATE INDEX IF NOT EXISTS "email_extracted_tasks_priority_idx" ON "email_extracted_tasks" ("priority");
CREATE INDEX IF NOT EXISTS "email_extracted_tasks_deadline_idx" ON "email_extracted_tasks" ("deadline");
CREATE INDEX IF NOT EXISTS "email_extracted_tasks_email_id_idx" ON "email_extracted_tasks" ("email_id");

-- Enable Row Level Security
ALTER TABLE "email_extracted_tasks" ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can view their own email tasks"
  ON "email_extracted_tasks" FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own email tasks"
  ON "email_extracted_tasks" FOR UPDATE
  USING (auth.uid() = user_id);

-- Service role can manage all tasks
CREATE POLICY "Service role can manage all email tasks"
  ON "email_extracted_tasks" USING (auth.role() = 'service_role');

-- Add the table to realtime publication if needed
ALTER PUBLICATION supabase_realtime ADD TABLE "email_extracted_tasks";

-- Comment on table and columns for documentation
COMMENT ON TABLE "email_extracted_tasks" IS 'Stores tasks extracted from emails by the AI processing pipeline';
COMMENT ON COLUMN "email_extracted_tasks"."email_id" IS 'Original email ID from which the task was extracted';
COMMENT ON COLUMN "email_extracted_tasks"."description" IS 'Description of the task to be completed';
COMMENT ON COLUMN "email_extracted_tasks"."deadline" IS 'Optional deadline for task completion';
COMMENT ON COLUMN "email_extracted_tasks"."assignee" IS 'Optional assignee for the task';
COMMENT ON COLUMN "email_extracted_tasks"."priority" IS 'Priority level of the task (high, medium, low)';
COMMENT ON COLUMN "email_extracted_tasks"."status" IS 'Current status of the task (pending, in_progress, completed, cancelled)';