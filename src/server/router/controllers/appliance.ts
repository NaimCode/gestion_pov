import { createRouter } from "./../context";
import { z } from "zod";

const table = "appliance";
export const applianceRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma[table].findMany({
        where: {
          id_user: {
            equals: ctx.session?.user?.id,
          },
        },
        include: {
          type: true,
        },
      });
    },
  })
  .mutation("create", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      console.log(input);
      const type = await prisma.type.findFirst({
        where: {
          libelle: {
            equals: input.type.libelle,
          },
        },
      });

      const data = await prisma[table].create({
        data: {
          reference: input.reference,
          dbid: input.dbid,
          libelle: input.libelle,
          id_type: type?.id as any,
          disponibilite:
            input.disponibilite != undefined ? input.disponibilite : false,
          id_user: session?.user?.id!,
        },
      }).catch((e) => {
        console.log(e);
      });
      return data;
    },
  })
  .mutation("update", {
    input: z.any(),
    async resolve({ input, ctx }) {
      const { session, prisma } = ctx;
      console.log(input);

      const type = await prisma.type.findFirst({
        where: {
          libelle: {
            equals: input.type.libelle,
          },
        },
      });

      return await ctx.prisma[table].update({
        where: {
          id: input.id,
        },
        data: {
          reference: input.reference,
          dbid: input.dbid,
          libelle: input.libelle,
          id_type: type?.id,
          disponibilite:
            input.disponibilite != undefined ? input.disponibilite : false,
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
