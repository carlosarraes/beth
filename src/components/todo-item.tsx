import type { Todo } from '../db/schema'
import * as elements from 'typed-html'

export function TodoItem({ content, completed, id }: Todo) {
  return (
    <div class="flex flex-row space-x-3">
      <p>{content}</p>
      <input
        type="checkbox"
        checked={completed}
        hx-post={`/todos/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      />
      <button
        class="text-red-500"
        hx-delete={`/todos/${id}`}
        hx-target="closest div"
        hx-swap="outerHTML"
      >
        X
      </button>
    </div>
  )
}
