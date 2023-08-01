import elements from 'typed-html'

export function TodoForm() {
  return (
    <form
      class="flex flex-row space-x-3 w-full p-4 border-t border-gray-200 fixed bottom-0"
      hx-post="/todos/add"
      hx-swap="beforebegin"
      _="on submit target.reset()"
    >
      <input
        type="text"
        name="content"
        class="border border-black w-3/4 p-1 dark:border-white dark:bg-gray-500 placeholder-gray-500 dark:placeholder-white"
        placeholder="Adicione um item"
      />
      <button type="submit" class="w-1/4 border border-black dark:border-white px-2 py-1">
        Add
      </button>
    </form>
  )
}
