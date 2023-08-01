import { InferModel, sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  price: integer('price', { mode: 'number' }).notNull().default(0),
  amount: integer('amount', { mode: 'number' }).notNull().default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export type Todo = InferModel<typeof todos>
