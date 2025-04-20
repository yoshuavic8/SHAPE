-- Add section completion timestamps to questionnaire_results table
ALTER TABLE questionnaire_results 
ADD COLUMN spiritual_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN heart_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN personality_completed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN experiences_completed_at TIMESTAMP WITH TIME ZONE;

-- Add index for faster queries
CREATE INDEX idx_questionnaire_results_user_id ON questionnaire_results(user_id);

-- Update existing records to set timestamps based on completed status
UPDATE questionnaire_results
SET 
  spiritual_completed_at = CASE WHEN jsonb_object_keys(spiritual_gifts) > 0 THEN completed_at ELSE NULL END,
  heart_completed_at = CASE WHEN jsonb_object_keys(heart_desire) > 0 THEN completed_at ELSE NULL END,
  personality_completed_at = CASE WHEN jsonb_object_keys(personality) > 0 THEN completed_at ELSE NULL END,
  experiences_completed_at = CASE WHEN jsonb_object_keys(experiences) > 0 THEN completed_at ELSE NULL END
WHERE is_completed = true;
