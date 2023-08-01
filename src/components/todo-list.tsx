import elements from 'typed-html'
import { TodoItem } from './todo-item'
import type { Todo } from '../db/schema'
import { TodoForm } from '.'

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div class="flex flex-col h-full space-y-1 w-full overflow-y-auto">
      {todos.map((todo) => (
        <TodoItem {...todo} />
      ))}
      <TodoForm />
    </div>
  )
}
