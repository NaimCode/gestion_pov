import { createRouter } from "./../context";
import { z } from "zod";
import { Prestation } from "@prisma/client";

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

      const data = await prisma.prestation.create({
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

//   .query("hello", {
//     input: z
//       .object({
//         text: z.string().nullish(),
//       })
//       .nullish(),
//     resolve({ input }) {
//       return {
//         greeting: `Hello ${input?.text ?? "world"}`,
//       };
//     },
//   })
//   .query("getAll", {
//     async resolve({ ctx }) {
//       return await ctx.prisma.example.findMany();
//     },
//   });
