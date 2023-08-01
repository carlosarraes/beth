import elements from 'typed-html'

export const Layout = ({ children }: elements.Children) => {
  return ` 
  <!DOCTYPE html>
  <html id="root" class="">
    <head>
      <title>Groceries</title>
      <link rel="stylesheet" href="/public/styles.css">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://unpkg.com/htmx.org@1.9.4"></script>
      <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
    </head>
      ${children}
    <script>
      function toggleDarkMode() {
        const root = document.getElementById('root');
        root.classList.toggle('dark');
      }
    </script>
  </html>
`
}
