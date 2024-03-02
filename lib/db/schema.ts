import {
  pgTable,
  integer, serial, varchar
} from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name').notNull(),
  email: varchar('email').notNull(),
  roleId: integer('roleId').notNull().references(() => role.id),
})

export const role = pgTable('role', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  productPermission: varchar('productPermission').notNull(),
  workspacePermission: varchar('workspacePermission').notNull(),
})

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  userId: integer('userId').notNull().references(() => users.id),
})

export type User = typeof users.$inferSelect;
export type Role = typeof role.$inferSelect;
