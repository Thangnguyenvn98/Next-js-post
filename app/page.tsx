"use client"

import axios from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'
import { PostType } from './types/Posts'
import { useState, useEffect} from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

//fetch all posts

const allPosts = async() => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
  
}

export default function Home() {
  const [searchValue,setSearchValue] = useState("")
  const [searchClicked, setSearchClicked] = useState(false);
  const {data,error, isLoading} = useQuery<PostType[]>({queryFn: allPosts, queryKey:["posts"]})//fetch data, querykey can be anything

                  //isLoading is exists as part of tanstack

  const handleSearchClick = () => {setSearchClicked(true) }
                 
                
  const filteredPosts = searchClicked ? data?.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())) : data
  useEffect(() => {
    if (searchValue === '') {
      setSearchClicked(false);
    }
  }, [searchValue]);
  
  

  if(error) return error
  if(isLoading) return 'Loading...'
  
 
  return (
    <>
    <main  >
      <div className='flex gap-3 items-center justify-center'>
            <input className="p-3 w-full my-5  border-white text-xs text-white bg-slate-500 border-opacity-100 rounded-md" type="text" placeholder="Search for keywords" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            <MagnifyingGlassIcon className="w-20 h-10 shadow-sm p-3 bg-gray-600 rounded-lg text-white" onClick={handleSearchClick}/>
            
            </div>
            {filteredPosts?.length === 0 && <p className='text-center'> No posts found that matched your keywords </p>}
 
      <AddPost/>
      {filteredPosts?.map((post)=>(
        <Post key={post.id} name={post.user.name} avatar={post.user.image} postTitle={post.title} id={post.id} comments={post.Comment}/>
      ))}
    </main>
    </>
  )
}
