// Tipos de archivo permitidos
export type SupportedImageFormats = "jpg" | "jpeg" | "png";
export type AcceptedBuckets = "avatars" | "tips" | "banners";


/* create or replace function delete_storage_avatar_object(bucket text, object text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
declare
  project_url text := 'https://pnfnkpwwfjrotsossegq.supabase.co';
  service_role_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuZm5rcHd3Zmpyb3Rzb3NzZWdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDY5NTI3MCwiZXhwIjoyMDEwMjcxMjcwfQ.ULTO_mBYo2oYjhP-Vx5YLXyR7uFS-1MUYomCaaXVZBo'; --  full access needed
  url text := project_url||'/storage/v1/object/'||bucket||'/'||object;
begin
  select
      into status, content
           result.status::int, result.content::text
      FROM extensions.http((
    'DELETE',
    url,
    ARRAY[extensions.http_header('authorization','Bearer '||service_role_key)],
    NULL,
    NULL)::extensions.http_request) as result;
end;
$$;

create or replace function delete_avatar(avatar_url text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('avatars', avatar_url) as result;
end;
$$;
 */