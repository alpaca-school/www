-- アルパカすく〜る: 認証ユーザーのプロフィール自動作成をDB側で保証する。
-- 既存ユーザーもバックフィルし、学習履歴の外部キーエラーを防ぐ。

create or replace function public.handle_alpaca_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), '学習者')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function public.handle_alpaca_new_user() from public, anon, authenticated;

drop trigger if exists on_alpaca_auth_user_created on auth.users;

create trigger on_alpaca_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_alpaca_new_user();

insert into public.profiles (id, display_name)
select
  auth_user.id,
  coalesce(nullif(auth_user.raw_user_meta_data ->> 'display_name', ''), '学習者')
from auth.users as auth_user
on conflict (id) do nothing;
