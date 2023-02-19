// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {getServerSession} from 'next-auth/next'
import { authOptions } from "../auth/[...nextauth]" 
import prisma from "@/prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "POST"){
        const session = await getServerSession(req,res,authOptions) //this is session, getting session from prisma 
        if(!session) return res.status(401).json({message: "Please sign in to make a post"})
        console.log(req.body)
        const title: string = req.body.title // match the parameters given from the previous

        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email},
        })

        if(title.length > 300) return res.status(403).json({message:"Please write shorter"})
        if (!title.length)
        return res.status(403).json({message: 'Please do not leave this empty'})


        // Create CreatePost
        try {
            const result = await prisma.post.create({
                data: {
                    title: title,
                    userId: prismaUser.id,
                }
            })
            res.status(200).json(result)
        }catch(error){
            res.status(403).json({err: 'Error creating post'})

        }
    }
}