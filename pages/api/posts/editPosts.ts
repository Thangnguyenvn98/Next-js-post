// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {getServerSession} from 'next-auth/next'
import { authOptions } from "../auth/[...nextauth]" 
import prisma from "@/prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "PATCH"){
        const session = await getServerSession(req,res,authOptions) //this is session, getting session from prisma 
        if(!session) return res.status(401).json({message: "Please sign in to make changes to your post"})
       
        
        
        
        // Editing a Post
        try {
            const {title, postId} = req.body.data
            
            if(title.length > 300) return res.status(403).json({message:"Please write it shorter"})
            if(!title.length){
                return res.status(403).json({message: "Please don't leave it blank"})
            }
            const post = await prisma.post.findUnique({
                where: { id: postId },
                select: { title: true, updatedAt: true }
            })
            if (title === post?.title) {
                return res.status(403).json({ message: "Please change something" })
            }
            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: { title: title }
            })
           
            res.status(200).json(updatedPost)
        }catch(error){
            res.status(403).json({err: 'Error editing your posts'})

        }
    }
}