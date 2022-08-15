import { createRouter } from "./../context";
import { z } from "zod";

const table = "suivi";
export const suiviRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma[table].findMany({
        where: {
          id_user: {
            equals: ctx.session?.user?.id,
          },
        },
        include: {
          pov: true,
          prestation:true
        },
      });
    },
  })
  .mutation("create", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      const pov =await prisma.pov.findFirst({
        where: {
          libelle: {
            equals: input.pov.libelle,
          },
        },
      });
      const prestation =await prisma.prestation.findFirst({
        where: {
          libelle: {
            equals: input.prestation.libelle,
          },
        },
      });
      console.log(input);
      delete input.pov;
      delete input.prestation;
      const data = await prisma[table]
        .create({
          data: {
            ...input,

            id_pov: pov?.id,
            id_prestation: prestation?.id,
            id_user: session?.user?.id!,
          },
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    },
  })
  .mutation("update", {
    input: z.any(),
    async resolve({ input, ctx }) {
        const pov =await ctx.prisma.pov.findFirst({
            where: {
              libelle: {
                equals: input.pov.libelle,
              },
            },
          });
          const prestation =await ctx.prisma.prestation.findFirst({
            where: {
              libelle: {
                equals: input.prestation.libelle,
              },
            },
          });
         
          delete input.pov;
          delete input.prestation;
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {

            ...input,
     
            id_pov: pov?.id,
            id_prestation: prestation?.id,
          
         
         

        },
      })     .catch((err) => {
        console.log(err);
      });;
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
