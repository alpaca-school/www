-- アルパカすく〜る: 学習履歴・認証基盤（フェーズ1）
-- Supabase SQL Editor または Supabase CLI から実行する。

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'child'
    check (role in ('child', 'parent', 'org_admin')),
  created_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.org_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  primary key (organization_id, user_id)
);

create table public.learning_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  material_id text not null,
  completed_at timestamptz not null default now(),
  reflection text,
  created_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  plan text check (plan in ('individual', 'organization')),
  stripe_subscription_id text,
  status text not null default 'inactive',
  created_at timestamptz not null default now()
);

create index org_members_user_id_idx
  on public.org_members (user_id);

create index learning_records_user_completed_at_idx
  on public.learning_records (user_id, completed_at desc);

create index learning_records_material_id_idx
  on public.learning_records (material_id);

create index subscriptions_user_id_idx
  on public.subscriptions (user_id);

create index subscriptions_organization_id_idx
  on public.subscriptions (organization_id);

create unique index subscriptions_stripe_subscription_id_idx
  on public.subscriptions (stripe_subscription_id)
  where stripe_subscription_id is not null;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.org_members enable row level security;
alter table public.learning_records enable row level security;
alter table public.subscriptions enable row level security;

-- org_members 自身を参照するRLSの再帰を避けるため、判定だけを返す関数に分離する。
-- Data APIへ露出しない専用スキーマに置き、直接RPCとして呼ばれないようにする。
create schema if not exists app_private;
revoke all on schema app_private from public;
grant usage on schema app_private to authenticated;

create or replace function app_private.is_org_admin_for(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.org_members as membership
    inner join public.profiles as profile
      on profile.id = membership.user_id
    where membership.organization_id = target_organization_id
      and membership.user_id = (select auth.uid())
      and profile.role = 'org_admin'
  );
$$;

revoke all on function app_private.is_org_admin_for(uuid) from public;
grant execute on function app_private.is_org_admin_for(uuid) to authenticated;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "profiles_insert_own_child"
  on public.profiles
  for insert
  to authenticated
  with check (
    (select auth.uid()) = id
    and role = 'child'
  );

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "learning_records_select_own"
  on public.learning_records
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "learning_records_insert_own"
  on public.learning_records
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "organizations_select_administered"
  on public.organizations
  for select
  to authenticated
  using (app_private.is_org_admin_for(id));

create policy "org_members_select_administered"
  on public.org_members
  for select
  to authenticated
  using (app_private.is_org_admin_for(organization_id));

create policy "subscriptions_select_own"
  on public.subscriptions
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- 公開・ログイン済みクライアントの権限を明示的に最小化する。
-- RLSに加えて列権限でもroleの自己昇格や履歴の書き換えを防ぐ。
revoke all on table public.profiles from anon, authenticated;
revoke all on table public.organizations from anon, authenticated;
revoke all on table public.org_members from anon, authenticated;
revoke all on table public.learning_records from anon, authenticated;
revoke all on table public.subscriptions from anon, authenticated;

grant select on table public.profiles to authenticated;
grant insert (id, display_name) on table public.profiles to authenticated;
grant update (display_name) on table public.profiles to authenticated;

grant select on table public.learning_records to authenticated;
grant insert (user_id, material_id, reflection) on table public.learning_records to authenticated;

grant select on table public.organizations to authenticated;
grant select on table public.org_members to authenticated;
grant select on table public.subscriptions to authenticated;

-- バックエンド処理はRLSを迂回できるSupabase標準ロールからのみ行う。
grant all on table public.profiles to service_role;
grant all on table public.organizations to service_role;
grant all on table public.org_members to service_role;
grant all on table public.learning_records to service_role;
grant all on table public.subscriptions to service_role;
