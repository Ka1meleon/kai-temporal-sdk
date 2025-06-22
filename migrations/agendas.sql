-- Create agendas table
CREATE TABLE IF NOT EXISTS public.agendas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  categories JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up Row Level Security for agendas
ALTER TABLE public.agendas ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read only their own agendas
CREATE POLICY "Users can view their own agendas" 
  ON public.agendas 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own agendas
CREATE POLICY "Users can insert their own agendas" 
  ON public.agendas 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own agendas
CREATE POLICY "Users can update their own agendas" 
  ON public.agendas 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own agendas
CREATE POLICY "Users can delete their own agendas" 
  ON public.agendas 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS agendas_user_id_idx ON public.agendas(user_id);