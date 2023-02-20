"use client"
type ToggleProps = {
    deletePost: () => void
    setToggle: (toggle:boolean )=> void
}
export default function Toggle({deletePost, setToggle}: ToggleProps){
    return (
        <div className='fixed bg-black/30 w-full h-full z-20 left-0 top-0' onClick={(e)=>setToggle(false)}>
            <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
                <h2 className="text-xl text-gray-700"> Are you sure you want to delete this post ?</h2>
                <h3 className="text-red-600">Clicking the delete button will permanently delete your post</h3>
                <button onClick={deletePost} className='rounded-lg bg-red-500 text-white text-sm py-2 px-6'>Delete Post</button>
            </div>
            

        </div>
    )
}
