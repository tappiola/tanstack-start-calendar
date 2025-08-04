# TanStack Start Event Calendar

A full project for an event calendar built with [TanStack Start](https://tanstack.com/start). It combines [TanStack Router](https://tanstack.com/router) for routing, [Tailwind CSS](https://tailwindcss.com) for styling, and a Prisma-powered backend backed by SQLite.

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Initialize the database**

   Create a `.env` file in the project root with:

   ```env
   DATABASE_URL="file:./dev.db"
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
