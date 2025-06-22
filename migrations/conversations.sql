-- Conversations Migration
-- This migration creates a conversations table to track Temporal workflow conversations

-- Create uuid extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the conversations table
CREATE TABLE IF NOT EXISTS "conversations" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "context_id" VARCHAR(255) NOT NULL UNIQUE,
  "user_id" UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "channel" VARCHAR(50) DEFAULT 'kai',
  "title" TEXT,
  "messages" JSONB DEFAULT '[]'::jsonb,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "conversations_user_id_idx" ON "conversations" ("user_id");
CREATE INDEX IF NOT EXISTS "conversations_context_id_idx" ON "conversations" ("context_id");
CREATE INDEX IF NOT EXISTS "conversations_channel_idx" ON "conversations" ("channel");
CREATE INDEX IF NOT EXISTS "conversations_created_at_idx" ON "conversations" ("created_at" DESC);
CREATE INDEX IF NOT EXISTS "conversations_messages_gin_idx" ON "conversations" USING GIN ("messages");

-- Enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow users to see their own conversations
CREATE POLICY "users_select_own_conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create their own conversations
CREATE POLICY "users_insert_own_conversations" ON conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own conversations
CREATE POLICY "users_update_own_conversations" ON conversations
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own conversations
CREATE POLICY "users_delete_own_conversations" ON conversations
  FOR DELETE USING (auth.uid() = user_id);

-- No automatic triggers or functions
-- The application code will handle setting updated_at timestamps
-- This gives more control to the application logic

-- Add comments for documentation
COMMENT ON TABLE conversations IS 'Stores conversation metadata and links to Temporal workflow instances';
COMMENT ON COLUMN conversations.context_id IS 'Unique identifier for the context';
COMMENT ON COLUMN conversations.user_id IS 'User ID who owns the conversation';
COMMENT ON COLUMN conversations.channel IS 'Channel of conversation (kai, telegram, api, etc.)';
COMMENT ON COLUMN conversations.title IS 'Optional title for the conversation';
COMMENT ON COLUMN conversations.messages IS 'JSON array storing conversation messages';