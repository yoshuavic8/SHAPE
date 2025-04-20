-- This file contains seed data that will be loaded when running `supabase db reset`
-- It's useful for development and testing

-- Insert test user if needed (uncomment and modify as needed)
/*
INSERT INTO auth.users (
  id,
  email,
  raw_user_meta_data,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'test@example.com',
  '{"full_name": "Test User"}',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- The trigger will automatically create user_profiles and questionnaire_results entries
*/
