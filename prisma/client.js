import { PrismaClient } from '@prisma/client'


const client = globalThis.primsa || new PrismaClient()

if(process.env.NODE_ENV !== 'production') globalThis.primsa = client

export default client