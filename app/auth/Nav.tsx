import Link from "next/link";
import Login from './Login'
import {getServerSession} from 'next-auth/next'
import { authOptions} from '../../pages/api/auth/[...nextauth]'
import Logged from "./Logged";
import { signIn } from "next-auth/react"


export default async function Nav(){
    const session = await getServerSession(authOptions)
    return (
    <nav className='flex justify-between items-center py-8'>
        <Link href={'/'}>
        <h2 className = 'font-bold text-lg'>Send it</h2>
        </Link>
        <ul className='flex items-center gap-6'> {/* user here is refer to prisma schema with USER */}
            {!session?.user && <Login/>} 
            {session?.user && <Logged image={session.user?.image || ""}/>}
        </ul>
    </nav>
    
    )
}

//fetch user and server components loging Button