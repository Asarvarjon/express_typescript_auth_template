import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists modules ( 
        id uuid primary key default uuid_generate_v4(),  
        name varchar(120) not null, 
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table modules;
    `)
}

