import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Layout } from './components'
import Todos from './api/controllers/todo-controller'

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) =>
    html(
      <Layout>
        <body
          class="flex w-full h-screen justify-center items-center"
          hx-get="/todos"
          hx-trigger="load"
          hx-swap="innerHTML"
        ></body>
      </Layout>,
    ),
  )
  .get('/todos', Todos.getAll)
  .delete('/todos/:id', Todos.remove, {
    params: t.Object({ id: t.Numeric() }),
  })
  .post('/todos/:id', Todos.flipTodo, {
    params: t.Object({ id: t.Numeric() }),
  })
  .post('/todos/add', Todos.create, {
    body: t.Object({ content: t.String({ minLength: 1 }) }),
  })

export default app
