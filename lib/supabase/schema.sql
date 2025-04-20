-- Create tables for user questionnaire data
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trigger to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- SHAPE Questionnaire Results table
CREATE TABLE IF NOT EXISTS questionnaire_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  spiritual_gifts JSONB,
  heart_desire JSONB,
  abilities JSONB,
  personality JSONB,
  experiences JSONB,
  shape_code TEXT,
  recommendations JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_completed BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE questionnaire_results ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view and update their own profiles"
  ON user_profiles
  FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view and update their own results"
  ON questionnaire_results
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
