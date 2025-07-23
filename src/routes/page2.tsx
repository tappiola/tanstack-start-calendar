import * as fs from 'fs'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(
      await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'),
  )
}

const getCount = createServerFn({
  method: 'GET',
}).handler(() => {
  return readCount()
})

const updateCount = createServerFn({ method: 'POST' })
    .validator((formData) => {
      if (!(formData instanceof FormData)) {
        throw new Error('Invalid form data')
      }

      const addBy = formData.get('addBy')

      if (!addBy) {
        throw new Error('addBy is required')
      }

      return parseInt(addBy.toString())
    })
    .handler(async ({ data: addByAmount }) => {
      const count = await readCount()
      await fs.promises.writeFile(filePath, `${count + addByAmount}`)
      // Reload the page to trigger the loader again
      return {ok: true, status: 301, headers: { Location: '/page2' } }
    })

export const Route = createFileRoute('/page2')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const state = Route.useLoaderData()

  return (
      <div>
        <form
            action={updateCount.url}
            method="POST"
            encType="multipart/form-data"
        >
          <input type="number" name="addBy" defaultValue="1" />
          <button type="submit">Add</button>
        </form>
        <pre>{state}</pre>
      </div>
  )
}
