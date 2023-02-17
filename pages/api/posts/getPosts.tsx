// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "@/prisma/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method === "GET"){
        
        
        // Fetch all posts
        try {
            const result = await prisma.post.findMany({
                include: {
                    user: true,
                    Comment: true
                },
                orderBy: {
                    createdAt: "desc"  //Descending order,
                }
            })
            res.status(200).json(result)
        }catch(error){
            res.status(403).json({err: 'Error fetching post'})

        }
    }
}