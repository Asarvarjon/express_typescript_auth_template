import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.raw(`
    create extension if not exists "uuid-ossp";
  `); 

  await knex.schema.raw(`
    CREATE TYPE gender_enum AS ENUM ('f', 'm'); 
  `)

  await knex.raw(`
  create table if not exists users(
    user_id uuid primary key default uuid_generate_v4(),
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp,
    first_name varchar(32) not null,
    last_name varchar(32) not null,
    address varchar(256) not null,
    image_src varchar(256),
    phone_number varchar(14) not null,
    birtdate date not null,
    password varchar(64) not null, 
    is_blocked bool not null default false, 
    gender gender_enum not null
  );
`); 

  await knex.raw(`
    create table user_sessions (
      session_id uuid primary key default uuid_generate_v4(),
      user_id uuid references users (user_id) not null,
      refresh_token character varying(1024) not null,
      refresh_token_expires_at timestamp with time zone not null,
      logged_in_at timestamp with time zone not null default current_timestamp,
      logged_out_at timestamp with time zone,
      is_logged_out boolean not null default false,
      remote_ip character varying(36) not null,
      device text not null
    );
  `); 

}


export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
  drop table users;
  `);  

  await knex.raw(`
  drop table user_sessions;
  `);
}

