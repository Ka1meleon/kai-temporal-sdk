CREATE TABLE IF NOT EXISTS transcriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  context_id TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  transcript TEXT NOT NULL,
  paragraphs JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create index on transcript text for faster fuzzy search
CREATE INDEX IF NOT EXISTS idx_transcriptions_transcript ON transcriptions USING gin(to_tsvector('english', transcript));

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_transcriptions_user_id ON transcriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_transcriptions_context_id ON transcriptions(context_id);

-- Add comment to table
COMMENT ON TABLE transcriptions IS 'Stores transcription data with paragraphs and sentences';

-- Set up Row Level Security for transcriptions
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own transcriptions
CREATE POLICY "Users can view their own transcriptions" 
  ON transcriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own transcriptions
CREATE POLICY "Users can insert their own transcriptions" 
  ON transcriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own transcriptions
CREATE POLICY "Users can update their own transcriptions" 
  ON transcriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own transcriptions
CREATE POLICY "Users can delete their own transcriptions" 
  ON transcriptions 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transcriptions_updated_at 
BEFORE UPDATE ON transcriptions 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();