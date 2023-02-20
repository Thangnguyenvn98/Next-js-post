'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import axios, { AxiosError } from "axios"


type PostProps = {
    id?: string
}

type PostComment = {
    title : string
    postId?: string
}

export default function AddComment({id}: PostProps){
    const [title,setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)
    const queryClient = useQueryClient()

    let commentToastId : string
    //Adding Comment to a Post
    const {mutate} = useMutation(
        async(data: PostComment) => await axios.post('/api/posts/addComment',{data}),
        {
            onSuccess: data => {
                setTitle('')
                setIsDisabled(false)
                toast.success("Added your comment", {id: commentToastId})
                queryClient.invalidateQueries(['detail-post'])
            },
            onError: (error) => {
                setIsDisabled(false)
                if(error instanceof AxiosError){
                    toast.error(error?.response?.data.message,{id: commentToastId})
                }
            }

        }
    )

        const submitComment = async (e: React.FormEvent) => {
            e.preventDefault()
            setIsDisabled(true)
            commentToastId = toast.loading("Adding your comment",{id: commentToastId})
            mutate({title: title, postId: id})
        }


    return (
        <form className='my-8' onSubmit={submitComment}>
            <h3>Add a comment</h3>
            <div className= 'flex flex-col my-2'>
            <input type="text" name='title' value={title} onChange={(e)=> setTitle(e.target.value)} className='p-4 text-lg rounded-md my-2 bg-rose-200 text-black' />
             </div>
             <div className='flex items-center justify-between gap-2'>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700":"text-gray-700"}`}>{`${title.length}/300`}</p>
                <button disabled={isDisabled} className='text-sm bg-teal-600 text-white py-2 rounded-lg px-6 disabled:opacity-25' type ="submit">Add Comments</button>
            </div>

        </form>
        
    )
}
