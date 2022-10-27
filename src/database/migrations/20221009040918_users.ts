import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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
        is_active bool not null default true, 
        gender gender_enum not null
      );
  `);
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    drop table users;
    `)
}

