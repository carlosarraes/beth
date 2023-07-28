import elements from 'typed-html'
import { TodoList, TodoItem } from '../../components'
import TodoService from '../services/todo-service'

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
}

export default new Todos()
