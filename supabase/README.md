# Supabase Migrations for SHAPE-E Application

This directory contains database migrations for the SHAPE-E application using Supabase.

## Migration Files

1. `20240601000000_create_shape_tables.sql`: Creates the necessary tables and sets up RLS policies
2. `20240601000001_add_missing_columns.sql`: Adds any missing columns to existing tables
3. `20240601000002_handle_existing_users.sql`: Creates entries for existing users
4. `20240601000003_fix_existing_data.sql`: Fixes any incomplete data in existing entries

## How to Apply Migrations

### Prerequisites

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

### Apply Migrations

To apply all migrations:

```bash
supabase db push
```

### Reset Database (Development Only)

To reset the database and apply all migrations and seed data:

```bash
supabase db reset
```

## Database Schema

### user_profiles

| Column     | Type      | Description                |
|------------|-----------|----------------------------|
| id         | UUID      | Primary key (user ID)      |
| full_name  | TEXT      | User's full name           |
| email      | TEXT      | User's email               |
| created_at | TIMESTAMP | Creation timestamp         |

### questionnaire_results

| Column         | Type      | Description                |
|----------------|-----------|----------------------------|
| id             | UUID      | Primary key                |
| user_id        | UUID      | Foreign key to auth.users  |
| spiritual_gifts | JSONB     | Spiritual gifts answers    |
| heart_desire   | JSONB     | Heart desire answers       |
| personality    | JSONB     | Personality answers        |
| experiences    | JSONB     | Experiences answers        |
| is_completed   | BOOLEAN   | Completion status          |
| completed_at   | TIMESTAMP | Completion timestamp       |
| created_at     | TIMESTAMP | Creation timestamp         |
| updated_at     | TIMESTAMP | Last update timestamp      |

## Row Level Security (RLS)

Both tables have RLS enabled with policies that allow users to:
- View their own data
- Update their own data
- Insert their own data

## Automatic User Profile Creation

A trigger is set up to automatically create entries in both tables when a new user registers.
