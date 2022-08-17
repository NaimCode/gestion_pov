import { createRouter } from "./../context";
import { z } from "zod";

const table = "contact";
export const contactRouter = createRouter()
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
        },
      });
    },
  })
  .mutation("create", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      const client =input.filter_id?await prisma.client.findFirst({
        where:{
          id:input.filter_id
        }
      }): await prisma.client.findFirst({
        where: {
          libelle: {
            equals: input.client.libelle,
          },
        },
      });
      console.log(input);
      delete input.client;
      delete input.filter_id;
    return await prisma[table]
        .create({
          data: {
            ...input,
            id_client: client?.id,
            id_user: session?.user?.id!,
          },
        })
    },
  })
  .mutation("update", {
    input: z.any(),
    async resolve({ input, ctx }) {
        const client = await ctx.prisma.client.findFirst({
            where: {
              libelle: {
                equals: input.client.libelle,
              },
            },
          });
          delete input.client;
      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {

            ...input,
            id_client: client?.id,
         

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
