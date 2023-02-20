import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { redirect } from "next/navigation"
import MyPosts from "./MyPosts"

export default async function Dashboard(){
    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin') //This is from next page signin
    }
    return(
        <main>
            <div className='flex gap-2'>
            <h1 className="text-2xl font-bold text-gray-600">Welcome back {session?.user?.name} !</h1>
            </div>
            <MyPosts/>
        </main>
    )
}