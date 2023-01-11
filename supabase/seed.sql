-- Create database table

create table users (
  uuid uuid references auth.users not null primary key,
  id text unique not null,
  name text not null,
  icon_url text,
  create_at timestamp with time zone,
  updated_at timestamp with time zone
);

create table profile (
  user_id text references users(id) not null primary key,
  text text,
  twitter_url text,
  soundcloud_url text,
  mixcloud_url text,
  create_at timestamp with time zone,
  updated_at timestamp with time zone
);

create table event (
  id serial not null primary key,
  title text,
  image_url text,
  text text,
  start_at timestamp with time zone,
  end_at timestamp with time zone,
  location_name text,
  location_url text,
  price int,
  capacity int,
  note text,
  publicly bool,
  create_at timestamp with time zone,
  updated_at timestamp with time zone
);

create table ticket (
  id text unique not null,
  user_id text references users(id),
  event_id serial references event(id),
  title text,
  date timestamp with time zone,
  location_name text,
  status bool,
  create_at timestamp with time zone,
  updated_at timestamp with time zone
);

create table event_organizer (
  id serial not null primary key,
  user_id text references users(id),
  event_id serial references event(id)
);

create table event_dj (
  id serial not null primary key,
  user_id text references users(id),
  event_id serial not null references event(id),
  row_number int not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone
);

create table event_vj (
  id serial not null primary key,
  user_id text references users(id),
  event_id serial not null references event(id),
  row_number int not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone
);

create table event_lisner (
  id serial not null primary key,
  user_id text references users(id),
  event_id serial references event(id)
);

-- Create strage bucket

insert into storage.buckets (id, name, public)
values ('user', 'user', true);

CREATE POLICY "User select policy" ON storage.objects FOR SELECT TO public USING (bucket_id = 'user');
CREATE POLICY "User insert policy" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'user');
CREATE POLICY "User update policy" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'user');
CREATE POLICY "User delete policy" ON storage.objects FOR DELETE TO public USING (bucket_id = 'user');

insert into storage.buckets (id, name, public)
values ('event', 'event', true);

CREATE POLICY "event select policy" ON storage.objects FOR SELECT TO public USING (bucket_id = 'event');
CREATE POLICY "event insert policy" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'event');
CREATE POLICY "event update policy" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'event');
CREATE POLICY "event delete policy" ON storage.objects FOR DELETE TO public USING (bucket_id = 'event');