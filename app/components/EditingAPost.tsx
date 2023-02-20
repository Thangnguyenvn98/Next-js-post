'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import { toast } from "react-hot-toast";



type EditAPostProps = {
    
    id: string
    
    title: string
    setToggleEdit: (toggle:boolean )=> void

    
    

}

type PostEdit = {
    title : string
    postId?: string
    
}

export default function EditingAPost({id,title, setToggleEdit}: EditAPostProps){
    const [titleInput,setTitleInput] = useState(title)
    const [isDisabled,setIsDisabled] = useState(false)

    let editToastID: string
    const queryClient = useQueryClient()

    //Editing A Post
    const {mutate} = useMutation(
        async (data: PostEdit) => await axios.patch("/api/posts/editPosts", {data}) // data used here to send a request body with DELETE requests
        ,{
        onError:(error) => {
            console.log(error)
            if(error instanceof AxiosError){
            toast.error(error?.response?.data.message, {id: editToastID})}
            setIsDisabled(false)
        },
        onSuccess: (data) => {
            console.log(data)
            setIsDisabled(false)
            toast.success("Post has been edited", {id: editToastID})
            queryClient.invalidateQueries(["auth-posts"])
            


        }
    }
        
    )
    const handleEditPost = async (e : React.FormEvent) => {
        console.log("YEs Sir")
        e.preventDefault()
        console.log("Passed this")
        editToastID = toast.loading("Editing your posts", {id: editToastID})
        setIsDisabled(true)
        mutate({title:titleInput, postId: id})
    }

    return(

        <div className='fixed bg-black/30 w-full h-full z-20 left-0 top-0' onClick={(e)=>setToggleEdit(false)} >
                <div className="flex flex-col items-center justify-center h-full " >
                <h2 className="text-xl font-bold text-indigo-600">Edit Your Post Below: </h2>
                <form  className='bg-white my-34 p-8 rounded-md w-[80vw] lg:w-[40vw]'  >
                <div className="flex flex-col my-4">
                <textarea
            
            name="title"
            className='p-4 text-lg rounded-md my-2 bg-gray-200 w-full text-black '
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onClick={(e)=> e.stopPropagation()}
            style={{ width: '100%' }}
            
            />
            </div>
             <div className='flex flex-row justify-between items-center gap-24'>
            <p className={`font-bold text-sm ${titleInput.length > 300 ? "text-red-700":"text-gray-700"}`}>{`${titleInput.length}/300`}</p>
        <button disabled={isDisabled} className=' bg-teal-500 rounded-lg p-4 disabled:opacity-25' onClick={handleEditPost}>Save </button>
            </div>
           
            </form>
            </div>
           
            
       
    </div>
    
     
    )
}