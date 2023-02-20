import Link from "next/link";
import Login from './Login'
import {getServerSession} from 'next-auth/next'
import { authOptions} from '../../pages/api/auth/[...nextauth]'
import Logged from "./Logged";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default async function Nav(){
    const session = await getServerSession(authOptions)
    return (
    <nav className='flex justify-between items-center py-8'>
        <Link href={'/'}>
            <div className='flex flex-row items-center gap-2'>
        <h2 className = 'font-bold text-lg'>PostUrThought
</h2>
<ChatBubbleLeftIcon className="h-6 w-6" />
</div>
        </Link>
        <ul className='flex items-center gap-6'> {/* user here is refer to prisma schema with USER */}
            {!session?.user && <Login/>} 
            {session?.user && <Logged image={session.user?.image || ""}/>}
        </ul>
    </nav>
    
    )
}

//fetch user and server components loging Button