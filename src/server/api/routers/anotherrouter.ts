import Router from "next/router"
import {z} from "zod"

import{
    createTRPCRouter,
    publicProcedure,
    protectedProcedure
} from "~/server/api/trpc"

export const anotherRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ctx})=>{
        return  ctx.prisma.todoTask.findMany()
    }),

    authentist: publicProcedure
    .input(z.string())
    .mutation(async({ctx, input})=>{


        const existingUser = await ctx.prisma.todoListUser.findFirst({
            where:{
                username:input
            }
        })

        if(existingUser){
            
            console.log("User already exists")

        }
        

        else{
            const newUser = await ctx.prisma.todoListUser.create({
                data:{
                    username:input
                }
            })
            console.log("new user created")
        }
    }),

    getAllOfOne: publicProcedure
    .input(z.string())
    .query(async ({ctx, input})=>{
        console.log('ye aya')
        const user = await ctx.prisma.todoListUser.findFirst({
            where:{
                username:input,
                
            },
            include:{TodoTask:true}
        })
        console.log(user)

        if(user){
            console.log(typeof(user.TodoTask))
            return user.TodoTask
        }

    }),

    deleteThat: publicProcedure
    .input(z.number())
    .mutation(async({ctx, input})=>{

        try{
        await ctx.prisma.todoTask.delete({
            where:{
                id: input
            }
        })

        console.log("ho gya ji")
    }
    catch{
        console.log("error aa gya")
    }
    })

    

})