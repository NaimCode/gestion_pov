import { createRouter } from "./../context";
import { z } from "zod";


const table='type'
export const typeRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
     
      return await ctx.prisma[table].findMany({
        where: {
          id_user: {
            equals: ctx.session?.user?.id,
          },
        },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      libelle: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;

      const data = await prisma[table].create({
        data: {
          libelle: input.libelle,
          id_user: session?.user?.id!,
        },
      });
      return data;
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      libelle: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {
          libelle: input.libelle,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma[table].delete({
        where: {
          id: input.id,
        },
      });
    },
  });

