import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { todos } from '../../db/schema'

class TodoService {
  getAll = async () => await db.select().from(todos).all()

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

    console.log(todo)
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
}

export default TodoService
