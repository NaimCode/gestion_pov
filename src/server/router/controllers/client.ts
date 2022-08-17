import { createRouter } from "./../context";
import { z } from "zod";


const table='client'
export const clientRouter = createRouter()
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
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
console.log(input)
      return await prisma[table].create({
        data: {
          secteur:input.secteur||'privé',
            activite:input.activite,
          libelle: input.libelle,
          id_user: session?.user?.id!,
        },
      })
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      libelle: z.string(),
      activite:z.string(),
      secteur:z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {
      
          libelle: input.libelle,
            activite:input.activite,
            secteur:input.secteur,

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

