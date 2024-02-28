import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const role_enum = pgEnum('role', ['admin', 'user']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name').notNull(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  workspaceId: integer('workspaceId').notNull().references(() => workspace.id),
  role: role_enum('role').notNull(),
})

export const workspace = pgTable('workspace', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
})

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  workspaceId: integer('workspaceId').notNull().references(() => workspace.id),
})
