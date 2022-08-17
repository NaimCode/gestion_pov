import { createRouter } from "./../context";
import { z } from "zod";


const table='seance'
export const seanceRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
     
      return await ctx.prisma[table].findMany({
        where: {
    
          id_user: {
            equals: ctx.session?.user?.id,
          },

        },include:{
            pov:true
        }
      });
    },
  })
  .mutation("create", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      const id_pov=input.filter_id
      delete input.pov;
      delete input.filter_id;
      return await prisma[table].create({
        data: {
          ...input,
          id_pov,
          id_user: session?.user?.id!,
        },
      })
    },
  })
  .mutation("update", {
    input: z.any(),
    async resolve({ input, ctx }) {
        const id_pov=input.filter_id
        delete input.pov;
        delete input.filter_id;
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {
      
            ...input,
          
            id_pov,
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

