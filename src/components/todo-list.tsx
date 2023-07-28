import elements from 'typed-html'
import { TodoItem } from './todo-item'
import { TodoForm } from './todo-form'
import type { Todo } from '../db/schema'

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="flex flex-col space-y-3">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  )
}
