import type { Todo } from '../db/schema'
import * as elements from 'typed-html'

export function TodoItemEdit({ content, completed, id, price, amount }: Todo) {
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
      <form class="flex justify-evenly space-x-8">
        <div class="flex w-full items-center gap-4">
          <label for="price">R$</label>
          <input
            name="price"
            type="number"
            value={String(price)}
            class="border w-1/2 text-center"
          />
          <input
            name="amount"
            type="number"
            value={String(amount)}
            class="border w-1/2 text-center"
          />
        </div>
        <div class="flex items-center justify-center gap-2">
          <button
            type="submit"
            hx-put={`/todos/${id}`}
            hx-target="closest section"
            hx-swap="outerHTML"
          >
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
              class="lucide lucide-check scale-75 self-center text-green-500"
            >
              <polyline points="20 6 9 17 4 12" />
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
      </form>
    </section>
  )
}
