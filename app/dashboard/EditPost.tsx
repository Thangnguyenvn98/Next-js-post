'use client'

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle"
import Post from '../components/Post';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";


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
    const [toggle,setToggle] = useState(false)
    let deleteToastID: string
    const queryClient = useQueryClient()

    //Delete Post
    const {mutate} = useMutation(
        async (id: string) => await axios.delete("/api/posts/deletePost", {data: id}) // data used here to send a request body with DELETE requests
        ,{
        onError:(error) => {
            console.log(error)
            toast.error("Error deleting post", {id: deleteToastID})
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Post has been deleted", {id: deleteToastID})
            queryClient.invalidateQueries(["auth-posts"])
            
        }
    }
        
    )

    const deletePost = () => {
        deleteToastID = toast.loading("Deleting your posts", {id: deleteToastID})

        mutate(id)
    }

    return(
        <>
        
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
                <button onClick={(e)=>setToggle(true)}className='rounded-lg bg-red-500 text-white text-sm py-2 px-6'>Delete</button>
            </div>
        </div>
        {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
        </>
    )
}