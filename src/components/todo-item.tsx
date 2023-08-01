import type { Todo } from '../db/schema'
import * as elements from 'typed-html'
import { formatToBRL } from '../helpers/format-currency'

export function TodoItem({ content, completed, id, price, amount }: Todo) {
  return (
    <section class="flex flex-row justify-between space-x-3 p-2 border-b">
      <div class="flex items-center justify-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          hx-post={`/todos/${id}`}
          hx-target="closest section"
          hx-swap="outerHTML"
        />
        <p>{content}</p>
      </div>
      <div class="flex space-x-8">
        <div class="flex items-center gap-4">
          <p>{formatToBRL(price)}</p>
          <p>{amount}</p>
        </div>
        <div class="flex items-center justify-center gap-2">
          <button hx-get={`/todos/${id}`} hx-target="closest section" hx-swap="outerHTML">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-pencil text-sky-500 scale-75 self-center"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            class="text-red-500"
            hx-delete={`/todos/${id}`}
            hx-target="closest section"
            hx-swap="outerHTML"
          >
            X
          </button>
        </div>
      </div>
    </section>
  )
}
