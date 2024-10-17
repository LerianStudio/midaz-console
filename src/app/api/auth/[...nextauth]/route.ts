import NextAuth from 'next-auth'

import { nextAuthCasdoorOptions } from '@/core/infrastructure/next-auth/casdoor/next-auth-casdoor-provider'

const handler = NextAuth(nextAuthCasdoorOptions)

export { handler as GET, handler as POST }
