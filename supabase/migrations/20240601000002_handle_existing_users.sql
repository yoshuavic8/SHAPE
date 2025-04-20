-- Create entries for existing users who don't have profiles yet
INSERT INTO public.user_profiles (id, full_name, email)
SELECT
  id,
  COALESCE(raw_user_meta_data->>'full_name', 'User'),
  email
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_profiles WHERE user_profiles.id = users.id
)
ON CONFLICT (id) DO NOTHING;

-- Create questionnaire entries for existing users who don't have entries yet
DO $$
BEGIN
  -- Check if all required columns exist
  IF EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'questionnaire_results' AND column_name = 'spiritual_gifts'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'questionnaire_results' AND column_name = 'heart_desire'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'questionnaire_results' AND column_name = 'personality'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'questionnaire_results' AND column_name = 'experiences'
  ) AND EXISTS (
    SELECT 1 FROM information_schema.columns WHERE table_name = 'questionnaire_results' AND column_name = 'is_completed'
  ) THEN
    -- All columns exist, proceed with insert
    INSERT INTO public.questionnaire_results (user_id, spiritual_gifts, heart_desire, personality, experiences, is_completed)
    SELECT
      id,
      '{}',
      '{}',
      '{}',
      '{}',
      FALSE
    FROM auth.users
    WHERE NOT EXISTS (
      SELECT 1 FROM public.questionnaire_results WHERE questionnaire_results.user_id = users.id
    )
    ON CONFLICT (user_id) DO NOTHING;
  ELSE
    RAISE NOTICE 'Skipping questionnaire_results insert because some columns are missing';
  END IF;
END
$$;
