// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { prestationRouter } from "./controllers/prestation";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("prestation.", prestationRouter);

  ;

// export type definition of API
export type AppRouter = typeof appRouter;
