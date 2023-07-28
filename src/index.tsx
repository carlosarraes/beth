import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { db } from './db'
import { Todo, todos } from './db/schema'
import { eq } from 'drizzle-orm'

new Elysia()
  .use(html())
  .get('/', ({ html }) =>
    html(
      <BaseHtml>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/todos"
          hx-trigger="load"
          hx-swap="innerHTML"
        ></body>
      </BaseHtml>,
    ),
  )
  .post('/clicked', () => <div>Im from server</div>)
  .get('/todos', async () => {
    const data = await db.select().from(todos).all()
    return <TodoList todos={data} />
  })
  .post(
    '/todos/toggle/:id',
    async ({ params }) => {
      const oldTodo = await db.select().from(todos).where(eq(todos.id, params.id)).get()
      const newTodo = await db
        .update(todos)
        .set({ completed: !oldTodo.completed })
        .where(eq(todos.id, params.id))
        .returning()
        .get()

      return <TodoItem {...newTodo} />
    },
    {
      params: t.Object({ id: t.Numeric() }),
    },
  )
  .delete(
    '/todos/delete/:id',
    async ({ params }) => {
      await db.delete(todos).where(eq(todos.id, params.id)).run()
    },
    { params: t.Object({ id: t.Numeric() }) },
  )
  .post(
    '/todos/add',
    async ({ body }) => {
      if (body.content.length === 0) {
        throw new Error('Content cannot be empty')
      }
      const newTodo = await db.insert(todos).values(body).returning().get()

      return <TodoItem {...newTodo} />
    },
    { body: t.Object({ content: t.String() }) },
  )
  .listen(3000)

console.log('Server running on port 3000')

const BaseHtml = ({ children }: elements.Children) => ` 
  <!DOCTYPE html>
  <html>
    <head>
      <title>BETH</title>
      <script src="https://unpkg.com/htmx.org@1.9.4"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
    </head>
      ${children}
  </html>
`
function TodoItem({ content, completed, id }: Todo) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/toggle/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button
        class="text-red-500"
        hx-delete={`/todos/delete/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  )
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="flex flex-col space-y-3">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  )
}

function TodoForm() {
  return (
    <form
      class="flex flex-row space-x-3"
      hx-post="/todos/add"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <input type="text" name="content" class="border border-black" />
      <button type="submit">Add</button>
    </form>
  )
}