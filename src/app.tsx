import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Layout, Header } from './components'
import Todos from './api/controllers/todo-controller'
import staticPlugin from '@elysiajs/static'

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get('/', ({ html }) =>
    html(
      <Layout>
        <body class="flex flex-col w-full h-screen justify-center items-center bg-white text-black dark:text-white dark:bg-gray-700">
          <Header />
          <main
            hx-get="/todos"
            hx-trigger="load"
            hx-swap="innerHTML"
            class="flex flex-col items-center justify-center w-full h-full"
          ></main>
        </body>
      </Layout>,
    ),
  )
  .get('/todos', Todos.getAll)
  .get('/todos/:id', Todos.getOne, {
    params: t.Object({ id: t.Numeric() }),
  })
  .get('/todos/sum', Todos.getSum)
  .delete('/todos/:id', Todos.remove, {
    params: t.Object({ id: t.Numeric() }),
  })
  .post('/todos/:id', Todos.flipTodo, {
    params: t.Object({ id: t.Numeric() }),
  })
  .post('/todos/add', Todos.create, {
    body: t.Object({ content: t.String({ minLength: 1 }) }),
  })
  .put('/todos/:id', Todos.update, {
    body: t.Object({
      price: t.Numeric(),
      amount: t.Numeric(),
    }),
    params: t.Object({ id: t.Numeric() }),
  })

export default app
