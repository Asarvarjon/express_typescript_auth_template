import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists role_modules ( 
        id uuid primary key default uuid_generate_v4(), 
        module_id uuid references modules(id) on delete cascade not null,
        role_id int references roles(id) on delete cascade not null
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table role_modules;
    `)
}

