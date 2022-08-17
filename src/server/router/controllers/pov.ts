import { createRouter } from "./../context";
import { z } from "zod";

const table = "pov";
export const povRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma[table].findMany({
        where: {
          id_user: {
            equals: ctx.session?.user?.id,
          },
        },
        include: {
          client: true,
          appliance:true
        },
      });
    },
  })
  .mutation("create", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      const client =await prisma.client.findFirst({
        where: {
          libelle: {
            equals: input.client.libelle,
          },
        },
      });
      const appliance =await prisma.appliance.findFirst({
        where: {
          libelle: {
            equals: input.appliance.libelle,
          },
        },
      });
      console.log(input);
      delete input.client;
      delete input.appliance;
     return await prisma[table]
        .create({
          data: {
            ...input,
            id_client: client?.id,
            id_appliance: appliance?.id,
            id_user: session?.user?.id!,
          },
        })
      
    },
  })
  .mutation("update", {
    input: z.any(),
    async resolve({ input, ctx }) {
        const client =await ctx.prisma.client.findFirst({
            where: {
              libelle: {
                equals: input.client.libelle,
              },
            },
          });
          const appliance =await ctx.prisma.appliance.findFirst({
            where: {
              libelle: {
                equals: input.appliance.libelle,
              },
            },
          });
          console.log(input);
          delete input.client;
          delete input.appliance;
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {

            ...input,
            id_client: client?.id,
            id_appliance: appliance?.id,
         
         

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
