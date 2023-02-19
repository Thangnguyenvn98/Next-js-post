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
        //Get User
        const prismaUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email
            }
        })
        // ADDING A COMMENT
        try {
            const {title, postId} = req.body.data
            if(!title.length){
                return res.status(401).json({message: "Please enter something"})
            }
            const result = await prisma.comment.create({
                data:{
                    message: title,
                    userId: prismaUser?.id,
                    postId: postId
                    
            }})
            res.status(200).json(result)
        }catch(error){
            res.status(403).json({err: 'Error deleting your posts'})

        }
    }
}