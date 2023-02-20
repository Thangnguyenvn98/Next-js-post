'use client'

import Post from "@/app/components/Post"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import AddComment from "@/app/components/AddComments"
import Image from "next/image"
import { CommentType} from "@/app/types/PostType"

type URL = {
    params: {
        slug: string
    }
}




const fetchDetails = async (slug: string) => {
    const response = await axios.get(`/api/posts/${slug}`)
    return response.data
}


export default function PostDetail(url: URL){
    
      

    const {data, isLoading} = useQuery({queryKey: ['detail-post'], queryFn: () => fetchDetails(url.params.slug)})
  

    if (isLoading) return "Loading ..."
    return (
        <div>
            <Post id={data.id} name={data.user.name} avatar={data.user.image} postTitle={data.title} comments={data.Comment}/>
            <AddComment id={data?.id}/>
            {
                data?.Comment?.map((comment: CommentType)=>(
                    <div key={comment.id} className="my-6 bg-white p-8">
                            <div className="flex items-center gap-2">
                                <Image src={comment.user?.image} width={24} height={24} alt='avatar'/>
                                <h3 className='font-bold text-gray-700'>{comment.user?.name}</h3>
                                <h2 className='text-sm text-black'>{comment.createdAt}</h2>
                            </div>
                            <div className="py-4 text-black">{comment.message}</div>
                    </div>
                ))
            }
        </div>
    )
}