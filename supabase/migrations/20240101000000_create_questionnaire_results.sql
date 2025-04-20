create table questionnaire_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  spiritual_gifts jsonb,
  heart_desire jsonb,
  abilities jsonb,
  personality jsonb,
  is_completed boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index idx_questionnaire_results_user_id on questionnaire_results(user_id);