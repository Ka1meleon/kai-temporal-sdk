-- Email Processing Results Migration
-- This migration creates a table to store the results of email analysis

-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the email_processing_results table
CREATE TABLE IF NOT EXISTS "email_processing_results" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "email_id" TEXT NOT NULL,
  "thread_id" TEXT NOT NULL,
  "account_id" TEXT NOT NULL,
  "from_address" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "received_at" TIMESTAMP WITH TIME ZONE NOT NULL,
  "classification" TEXT NOT NULL,
  "priority" TEXT NOT NULL,
  "requires_response" BOOLEAN NOT NULL,
  "sentiment" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "confidence_score" NUMERIC(3,2) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Index for faster lookups
  UNIQUE("user_id", "email_id")
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS "email_processing_results_user_id_idx" ON "email_processing_results" ("user_id");
CREATE INDEX IF NOT EXISTS "email_processing_results_classification_idx" ON "email_processing_results" ("classification");
CREATE INDEX IF NOT EXISTS "email_processing_results_priority_idx" ON "email_processing_results" ("priority");
CREATE INDEX IF NOT EXISTS "email_processing_results_thread_id_idx" ON "email_processing_results" ("thread_id");
CREATE INDEX IF NOT EXISTS "email_processing_results_received_at_idx" ON "email_processing_results" ("received_at");

-- Enable Row Level Security
ALTER TABLE "email_processing_results" ENABLE ROW LEVEL SECURITY;

-- Create policies for secure access
CREATE POLICY "Users can view their own email results"
  ON "email_processing_results" FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all results
CREATE POLICY "Service role can manage all email results"
  ON "email_processing_results" USING (auth.role() = 'service_role');

-- Add the table to realtime publication if needed
ALTER PUBLICATION supabase_realtime ADD TABLE "email_processing_results";

-- Comment on table and columns for documentation
COMMENT ON TABLE "email_processing_results" IS 'Stores email analysis results from the AI processing pipeline';
COMMENT ON COLUMN "email_processing_results"."email_id" IS 'Original email ID from the email provider';
COMMENT ON COLUMN "email_processing_results"."classification" IS 'AI-determined classification of the email (e.g., INQUIRY, TASK_REQUEST)';
COMMENT ON COLUMN "email_processing_results"."priority" IS 'AI-determined priority of the email (e.g., URGENT, HIGH, MEDIUM, LOW)';
COMMENT ON COLUMN "email_processing_results"."sentiment" IS 'AI-detected sentiment of the email content';
COMMENT ON COLUMN "email_processing_results"."summary" IS 'AI-generated summary of the email content';
COMMENT ON COLUMN "email_processing_results"."confidence_score" IS 'AI confidence score for the analysis (0-1)';