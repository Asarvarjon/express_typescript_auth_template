import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists roles ( 
        id int primary key,
        name varchar(256) not null,
        description text 
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table roles;
    `)
}

