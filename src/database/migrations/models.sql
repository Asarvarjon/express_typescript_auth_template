create table if not exists constants (
  id uuid primary key default uuid_generate_v4(),
  key varchar(256) not null,
  value varchar(256) not null,
  created_at timestamp with time zone not null default current_timestamp
); 