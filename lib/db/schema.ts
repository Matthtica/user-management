import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar, boolean } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('name').notNull(),
  email: varchar('email').notNull(),
  roleId: integer('roleId').notNull().references(() => role.id),
})

export const role = pgTable('role', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  permissionCreate: boolean('permissionCreate').notNull(),
  permissionRead: boolean('permissionRead').notNull(),
  permissionUpdate: boolean('permissionUpdate').notNull(),
  permissionDelete: boolean('permissionDelete').notNull(),
})

export const product = pgTable('product', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  userId: integer('userId').notNull().references(() => users.id),
})
