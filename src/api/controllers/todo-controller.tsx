import elements from 'typed-html'
import { TodoList, TodoItem, TodoItemEdit } from '../../components'
import TodoService from '../services/todo-service'
import { formatToBRL } from '../../helpers/format-currency'

class Todos {
  constructor(private ctx = new TodoService()) {}

  getAll = async () => {
    try {
      const data = await this.ctx.getAll()

      return <TodoList todos={data} />
    } catch (err) {
      console.error(err)
    }
  }

  getOne = async ({ params }: { params: { id: number } }) => {
    try {
      const data = await this.ctx.getOne(params.id)

      return <TodoItemEdit {...data} />
    } catch (err) {
      console.error(err)
    }
  }

  flipTodo = async ({ params }: { params: { id: number } }) => {
    try {
      const newTodo = await this.ctx.flip(params.id)

      return <TodoItem {...newTodo} />
    } catch (err) {
      console.error(err)
    }
  }

  remove = async ({ params }: { params: { id: number } }) => {
    await this.ctx.remove(params.id)
  }

  create = async ({ body }: { body: { content: string } }) => {
    const todo = await this.ctx.create(body.content)

    return <TodoItem {...todo} />
  }

  update = async ({
    body,
    params,
  }: {
    body: { price: number; amount: number }
    params: { id: number }
  }) => {
    const todo = await this.ctx.update(params.id, body)

    return <TodoItem {...todo} />
  }

  getSum = async () => {
    const sum = (await this.ctx.getSum()) ?? 0

    return (
      <div id="show-price" hx-swap="outerHTML" hx-get="/todos/sum" hx-trigger="load delay:15s">
        <span>{formatToBRL(sum)}</span>
      </div>
    )
  }
}

export default new Todos()
