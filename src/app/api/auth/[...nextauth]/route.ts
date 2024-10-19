import NextAuth from 'next-auth'
import { nextAuthOptions } from '@/utils/ory-credentials-provider'

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
