import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("modules").del();

    // Inserts seed entries
    await knex("modules").insert([ 
        'auth',
        'something'
    ]);
};  