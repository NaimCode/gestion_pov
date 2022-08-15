import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .query("me", {
 
   async resolve({ ctx }) {
      //get from account
        return await ctx.prisma.user.findFirst({
            where: {
                id: ctx.session?.user?.id
            
    
            },
            include: {
             accounts:true
            }
        })

    
    }
  }).mutation("delete", {

    async resolve({ ctx }) {
      return await ctx.prisma.user.delete({
        where: {
          email: 'naimdevelopper@gmail.com',
          
        }
      });
    }
  })

 