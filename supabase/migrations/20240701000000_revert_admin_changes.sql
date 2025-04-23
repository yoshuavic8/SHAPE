-- Hapus policies yang baru dibuat
DROP POLICY IF EXISTS "Admin dapat melihat semua profiles" ON profiles;
DROP POLICY IF EXISTS "Admin dapat melihat semua questionnaire_results" ON questionnaire_results;
DROP POLICY IF EXISTS "Admin dapat mengupdate semua profiles" ON profiles;
DROP POLICY IF EXISTS "Admin dapat mengupdate semua questionnaire_results" ON questionnaire_results;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own results" ON questionnaire_results;

-- Hapus tabel profiles
DROP TABLE IF EXISTS profiles;

-- Pastikan RLS policies asli untuk questionnaire_results masih ada
-- Jika tidak ada, buat kembali
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'questionnaire_results' 
    AND policyname = 'Users can view their own results'
  ) THEN
    CREATE POLICY "Users can view their own results"
      ON questionnaire_results
      FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'questionnaire_results' 
    AND policyname = 'Users can update their own results'
  ) THEN
    CREATE POLICY "Users can update their own results"
      ON questionnaire_results
      FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'questionnaire_results' 
    AND policyname = 'Users can insert their own results'
  ) THEN
    CREATE POLICY "Users can insert their own results"
      ON questionnaire_results
      FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;
