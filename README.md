# Express-Next-Typeorm-Monorepo-Starter

## Stacks
- Express.js
- Next.js
- Typeorm with Postgres
- Tsoa
- Turbo

## Structure
All apps are in `packages` folder:
- `web`: Next.js with Tailwind Config
- `api`: Express.js app with Typeorm, PostgreSQL, Tsoa.


## Install & Start

- In the root folder, run `pnpm i` to install all the packages
- To install new package, run
  - `pnpm add <package-name> --filter <app-name>`
  - `pnpm add --save-dev <package-name> --filter <app-name>`
- To run all apps, run `yarn dev`


## Migration
- To generate new migration file, run `yarn migration:generate -n <migration-name>` on the `api` folder.
- To run migrations, run `yarn migration:run` on the `api` folder.

## Route & Api Doc Generation
- To generate routes and swagger api docs with `tsoa`, run `yarn gen:swagger` on `api` folder.
