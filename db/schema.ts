import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const linkGroups = sqliteTable('link_groups', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    order: integer('order').default(0).notNull(),
});

export const links = sqliteTable('links', {
    id: text('id').primaryKey(),
    groupId: text('group_id').references(() => linkGroups.id),
    title: text('title').notNull(),
    url: text('url').notNull(),
    icon: text('icon'),
    color: text('color'),
    order: integer('order').default(0).notNull(),
});

export const projectGroups = sqliteTable('project_groups', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    order: integer('order').default(0).notNull(),
});

export const projects = sqliteTable('projects', {
    id: text('id').primaryKey(),
    groupId: text('group_id').references(() => projectGroups.id),
    title: text('title').notNull(),
    description: text('description'),
    url: text('url'),
    githubUrl: text('github_url'),
    coverImage: text('cover_image'),
    order: integer('order').default(0).notNull(),
});

export const donateGroups = sqliteTable('donate_groups', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    order: integer('order').default(0).notNull(),
});

export const donates = sqliteTable('donates', {
    id: text('id').primaryKey(),
    groupId: text('group_id').references(() => donateGroups.id),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    accountName: text('account_name').notNull(),
    accountNumber: text('account_number').notNull(),
    order: integer('order').default(0).notNull(),
});
