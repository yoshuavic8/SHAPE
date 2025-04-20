-- Fix existing data that might be incomplete
DO $$
BEGIN
  -- Update questionnaire_results entries with empty JSON objects if they are null
  UPDATE public.questionnaire_results
  SET 
    spiritual_gifts = COALESCE(spiritual_gifts, '{}'),
    heart_desire = COALESCE(heart_desire, '{}'),
    personality = COALESCE(personality, '{}'),
    experiences = COALESCE(experiences, '{}')
  WHERE 
    spiritual_gifts IS NULL OR 
    heart_desire IS NULL OR 
    personality IS NULL OR 
    experiences IS NULL;
  
  -- Set is_completed to FALSE if it's NULL
  UPDATE public.questionnaire_results
  SET is_completed = FALSE
  WHERE is_completed IS NULL;
  
  -- Add missing entries for users who have profiles but no questionnaire results
  INSERT INTO public.questionnaire_results (user_id, spiritual_gifts, heart_desire, personality, experiences, is_completed)
  SELECT 
    id, 
    '{}', 
    '{}', 
    '{}', 
    '{}', 
    FALSE
  FROM public.user_profiles
  WHERE NOT EXISTS (
    SELECT 1 FROM public.questionnaire_results WHERE questionnaire_results.user_id = user_profiles.id
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Add missing profiles for users who have questionnaire results but no profile
  INSERT INTO public.user_profiles (id, full_name, email)
  SELECT 
    qr.user_id, 
    COALESCE(u.raw_user_meta_data->>'full_name', 'User'), 
    COALESCE(u.email, 'unknown@example.com')
  FROM public.questionnaire_results qr
  LEFT JOIN auth.users u ON qr.user_id = u.id
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_profiles WHERE user_profiles.id = qr.user_id
  )
  ON CONFLICT (id) DO NOTHING;
END
$$;
