'use client'

import Image from "next/image"
import { useState } from "react"


type EditProps = {
    avatar: string
    id: string
    name: string
    title: string
    comments?: {
        id:string
        postId: string
        userId: string
    }[]

}

export default function EditPost({avatar,name,title,comments,id}: EditProps){
    return(
        <div className='bg-white my-8 p-8 rounded-lg'>
            <div className='flex  gap-2 items-center'>
                <Image src={avatar} width={32} height={32} alt={'avatar'}/>
                <h3 className="font-bold text-gray-700">{name}</h3>
            
            </div>
            <div className='my-8'>
            <p className='break-words'>{title}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
                <p className='text-sm font-bold text-gray-700'>{comments?.length} Comments</p>
                <button className='rounded-lg bg-red-500 text-white text-sm py-2 px-6'>Delete</button>
            </div>
        </div>
    )
}