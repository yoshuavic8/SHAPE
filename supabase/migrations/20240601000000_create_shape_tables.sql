-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questionnaire_results table
CREATE TABLE IF NOT EXISTS public.questionnaire_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  spiritual_gifts JSONB DEFAULT '{}',
  heart_desire JSONB DEFAULT '{}',
  personality JSONB DEFAULT '{}',
  experiences JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_questionnaire_results_user_id ON public.questionnaire_results(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questionnaire_results ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view their own profiles"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profiles"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profiles"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create policies for questionnaire_results
CREATE POLICY "Users can view their own results"
  ON public.questionnaire_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own results"
  ON public.questionnaire_results
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON public.questionnaire_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create user profile
  INSERT INTO public.user_profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email
  );

  -- Create empty questionnaire results
  INSERT INTO public.questionnaire_results (
    user_id,
    spiritual_gifts,
    heart_desire,
    personality,
    experiences,
    is_completed
  )
  VALUES (
    NEW.id,
    '{}',
    '{}',
    '{}',
    '{}',
    FALSE
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT ALL ON TABLE public.user_profiles TO authenticated;
GRANT ALL ON TABLE public.questionnaire_results TO authenticated;
