import { eq, sql } from 'drizzle-orm'
import { db } from '../../db'
import { todos } from '../../db/schema'

class TodoService {
  getAll = async () => await db.select().from(todos).all()

  getOne = async (id: number) => {
    const todo = await db.select().from(todos).where(eq(todos.id, id)).get()

    if (!todo) throw new Error('Todo not found')

    return todo
  }

  flip = async (id: number) => {
    const oldTodo = await db.select().from(todos).where(eq(todos.id, id)).get()

    if (!oldTodo) throw new Error('Todo not found')

    const newTodo = await db
      .update(todos)
      .set({ completed: !oldTodo.completed })
      .where(eq(todos.id, id))
      .returning()
      .get()

    return newTodo
  }

  remove = async (id: number) => {
    const todo = await db.select().from(todos).where(eq(todos.id, id)).get()

    if (!todo) throw new Error('Todo not found')

    await db.delete(todos).where(eq(todos.id, id)).run()
  }

  create = async (text: string) => {
    const todo = await db
      .insert(todos)
      .values({ content: text, completed: false })
      .returning()
      .get()

    return todo
  }

  update = async (id: number, body: { price: number; amount: number }) => {
    const todo = await db.update(todos).set(body).where(eq(todos.id, id)).returning().get()

    return todo
  }

  getSum = async () => {
    const result = await db
      .select({ totalPrice: sql<number>`sum(${todos.price} * ${todos.amount})` })
      .from(todos)
      .where(eq(todos.completed, true))
      .get()

    return result.totalPrice || 0
  }
}

export default TodoService
