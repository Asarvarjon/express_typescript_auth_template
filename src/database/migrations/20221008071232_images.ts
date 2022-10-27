import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
        create table if not exists images (
            id uuid primary key default uuid_generate_v4(),
            name varchar(1024) not null,
            src varchar(64) not null,
            size bigint not null,
            ext varchar(6) not null,
            mimetype varchar(16) not null
        );
    `)
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        drop table images;
    `)
}
