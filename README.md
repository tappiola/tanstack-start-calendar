# TanStack Start Event Calendar

An event calendar built with [TanStack Start](https://tanstack.com/start). It uses [TanStack Router](https://tanstack.com/router) for routing, [Tailwind CSS](https://tailwindcss.com) for styling, and a Prisma-powered backend backed by PostgreSQL.

Same logic has implemented using [Next.js](https://github.com/tappiola/next-js-calendar) to compare capabilites of frameworks.

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Initialize the database**

   Create a `.env` file in the project root with a PostgreSQL connection URL, for example:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tanstack_calendar?schema=public"
   ```

   Then run:

   ```bash
   pnpm prisma db push
   pnpm prisma db seed
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Run the linter**

   ```bash
   pnpm lint
   ```

## Build

Create an optimized production build:

```bash
pnpm build
```

## License

This project is licensed under the ISC License.
