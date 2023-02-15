"use client"  // Interact with client interface

import { useState } from "react"
import {useMutation, useQueryClient} from '@tanstack/react-query'
import axios from "axios"

export default function CreatePost(){
    const [title, setTitle] = useState("")
    const [isDisabled,setIsDisabled] = useState(false)

    //Create a post using useMutation by invoking it, we need to set up an api to get it from, install axios
    // First parameter is an async function,making call to api
    const {mutate} = useMutation(
        async (title: string) => await axios.post("/api/posts/addPost", {title}), //man here is a data object, basically the key name
        {onError: (error) => {
            console.log(error)
        },
         onSuccess: (data) => {
            console.log(data)
            setTitle('') //reset title and button disabled to false
            setIsDisabled(false)
         }   }
        )
        
    
     const submitPost = async (e : React.FormEvent)  => {
        e.preventDefault()
        setIsDisabled(true)
        mutate(title)
     }


    return (
        <form className='bg-blue-50  my-8 p-8 rounded-md' onSubmit = {submitPost}>
            <div className="flex flex-col my-4">
                <textarea onChange={(e)=>setTitle(e.target.value)}name="title" value={title} placeholder ="What's on your mind" className='p-4 text-lg rounded-md my-2 bg-gray-200'></textarea>
            </div>
            <div className='flex items-center justify-between gap-2'>
                <p className={`font-bold text-sm ${title.length > 300 ? "text-red-700":"text-gray-700"}`}>{`${title.length}/300`}</p>
                <button disabled={isDisabled} className='text-sm bg-teal-600 text-white py-2 rounded-lg px-6 disabled:opacity-25' type ="submit">Create a Post</button>
            </div>
        </form>
    )
}