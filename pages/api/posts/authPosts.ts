// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import {getServerSession} from 'next-auth/next'
import { authOptions } from "../auth/[...nextauth]" 
import prisma from "@/prisma/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "GET"){
        const session = await getServerSession(req,res,authOptions) //this is session, getting session from prisma 
        if(!session) return res.status(401).json({message: "Please sign in to make a post"})
        

        // Get Auth User Post into dashboard
        try {
            const data = await prisma.user.findUnique({  //displaying post specific to user on their dashboard hence findUnique
                where:{
                    email: session.user?.email
                },
                include: {
                    Post: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            Comment: true
                        }
                    }
                }
            })
            res.status(200).json(data)
        }catch(error){
            res.status(403).json({err: 'Error getting user Posts and Comments'})

        }
    }
}