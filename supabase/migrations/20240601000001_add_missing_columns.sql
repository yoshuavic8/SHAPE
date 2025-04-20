-- Add missing columns to questionnaire_results if they don't exist
DO $$
BEGIN
  -- Add spiritual_gifts column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionnaire_results' AND column_name = 'spiritual_gifts'
  ) THEN
    ALTER TABLE public.questionnaire_results ADD COLUMN spiritual_gifts JSONB DEFAULT '{}';
  END IF;

  -- Add heart_desire column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionnaire_results' AND column_name = 'heart_desire'
  ) THEN
    ALTER TABLE public.questionnaire_results ADD COLUMN heart_desire JSONB DEFAULT '{}';
  END IF;

  -- Add personality column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionnaire_results' AND column_name = 'personality'
  ) THEN
    ALTER TABLE public.questionnaire_results ADD COLUMN personality JSONB DEFAULT '{}';
  END IF;

  -- Add experiences column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionnaire_results' AND column_name = 'experiences'
  ) THEN
    ALTER TABLE public.questionnaire_results ADD COLUMN experiences JSONB DEFAULT '{}';
  END IF;

  -- Add is_completed column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'questionnaire_results' AND column_name = 'is_completed'
  ) THEN
    ALTER TABLE public.questionnaire_results ADD COLUMN is_completed BOOLEAN DEFAULT FALSE;
  END IF;
END
$$;
