import { createRouter } from "./../context";
import { z } from "zod";


const table='participant'
export const participantRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
     
      return await ctx.prisma[table].findMany({
        where: {
    
          id_user: {
            equals: ctx.session?.user?.id,
          },

        },include:{
            seance:true
        }
      });
    },
  })
  .mutation("create", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      const id_seance=input.filter_id
      delete input.seance;
      delete input.filter_id;
      const data = await prisma[table].create({
        data: {
          ...input,
          id_seance,
          id_user: session?.user?.id!,
        },
      }).catch(err=>{
        console.log(err)
        
        }
        );
      return data;
    },
  })
  .mutation("update", {
    input: z.any(),
    async resolve({ input, ctx }) {
        const id_seance=input.filter_id
        delete input.seance;
        delete input.filter_id;
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {
      
            ...input,
          
            id_seance,
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

