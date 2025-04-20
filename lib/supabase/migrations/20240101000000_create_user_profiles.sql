create table user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null
);

alter table user_profiles enable row level security;

create policy "User can view their own profile" on user_profiles
for select using (auth.uid() = id);

create policy "User can update their own profile" on user_profiles
for update using (auth.uid() = id);