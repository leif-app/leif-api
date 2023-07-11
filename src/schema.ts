import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	email: text('email').notNull(),
	team_id: integer('team_id').notNull(),
	org_id: integer('org_id').notNull(),
    roles: text('roles').notNull(),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    last_reading_at: text('last_reading_at').notNull(),
});

export const carbon = sqliteTable('carbon', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	user_id: integer('user_id').notNull(),
	time_from: text('time_from').notNull(),
	time_to: text('time_to'),
	amount: real('amount').notNull(),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const teams = sqliteTable('teams', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    last_reading_at: text('last_reading_at').notNull(),
});

export const organisations = sqliteTable('organisations', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
    created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    last_reading_at: text('last_reading_at').notNull(),
});
