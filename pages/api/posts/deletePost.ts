// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {getServerSession} from 'next-auth/next'
import { authOptions } from "../auth/[...nextauth]" 
import prisma from "@/prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "DELETE"){
        const session = await getServerSession(req,res,authOptions) //this is session, getting session from prisma 
        if(!session) return res.status(401).json({message: "Please sign in to make a post"})
        

        // DELETING A POST
        try {
            const postId = req.body //passing it the actual id of the post
            console.log(postId)
            const result = await prisma.post.delete({
                where:{
                    id: postId
                }})
           
            res.status(200).json(result)
        }catch(error){
            res.status(403).json({err: 'Error deleting your posts'})

        }
    }
}