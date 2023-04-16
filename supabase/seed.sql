-- Create database table

create table profile (
  uuid uuid references auth.users not null primary key,
  id text unique not null,
  name text not null,
  icon_url text,
  text text,
  twitter_url text,
  soundcloud_url text,
  mixcloud_url text,
  create_at timestamp with time zone,
  updated_at timestamp with time zone
);

create table guest (
  id text unique not null,
  name text not null,
  icon_url text,
  text text,
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

create table event_organizer (
  id serial not null,
  user_id text not null references profile(id),
  event_id serial not null references event(id),
  primary key (user_id, event_id)
);

create table event_dj (
  id serial not null,
  user_id text not null references profile(id),
  event_id serial not null references event(id),
  row_number int not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  primary key (user_id, event_id)
);

create table event_guestdj (
  id serial not null,
  user_id text not null references guest(id),
  event_id serial not null references event(id),
  row_number int not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  primary key (user_id, event_id)
);

create table event_vj (
  id serial not null,
  user_id text not null references profile(id),
  event_id serial not null references event(id),
  row_number int not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  primary key (user_id, event_id)
);

create table event_guestvj (
  id serial not null,
  user_id text not null references guest(id),
  event_id serial not null references event(id),
  row_number int not null,
  start_time timestamp with time zone,
  end_time timestamp with time zone,
  primary key (user_id, event_id)
);

create table ticket (
  id text unique not null,
  user_id text not null references profile(id),
  event_id serial not null references event(id),
  status bool,
  primary key (user_id, event_id),
  create_at timestamp with time zone,
  updated_at timestamp with time zone
);

-- Create strage bucket

insert into storage.buckets (id, name, public)
values ('profile', 'profile', true);

CREATE POLICY "profile select policy" ON storage.objects FOR SELECT TO public USING (bucket_id = 'profile');
CREATE POLICY "profile insert policy" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'profile');
CREATE POLICY "profile update policy" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'profile');
CREATE POLICY "profile delete policy" ON storage.objects FOR DELETE TO public USING (bucket_id = 'profile');

insert into storage.buckets (id, name, public)
values ('guest', 'guest', true);

CREATE POLICY "guest select policy" ON storage.objects FOR SELECT TO public USING (bucket_id = 'guest');
CREATE POLICY "guest insert policy" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'guest');
CREATE POLICY "guest update policy" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'guest');
CREATE POLICY "guest delete policy" ON storage.objects FOR DELETE TO public USING (bucket_id = 'guest');

insert into storage.buckets (id, name, public)
values ('event', 'event', true);

CREATE POLICY "event select policy" ON storage.objects FOR SELECT TO public USING (bucket_id = 'event');
CREATE POLICY "event insert policy" ON storage.objects FOR INSERT TO public WITH CHECK (bucket_id = 'event');
CREATE POLICY "event update policy" ON storage.objects FOR UPDATE TO public USING (bucket_id = 'event');
CREATE POLICY "event delete policy" ON storage.objects FOR DELETE TO public USING (bucket_id = 'event');