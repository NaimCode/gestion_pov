import { createRouter } from "./../context";
import { z } from "zod";


const table='prestation'
export const prestationRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      console.log("request getAll");
      return await ctx.prisma.prestation.findMany({
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

     return await prisma.prestation.create({
        data: {
          libelle: input.libelle,
          id_user: session?.user?.id!,
        },
      });
 
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      libelle: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.prestation.update({
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
      return await ctx.prisma.prestation.delete({
        where: {
          id: input.id,
        },
      });
    },
  });

