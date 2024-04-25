import { OryAuthAPIAdapter } from '@/adapters/OryAuthAPIAdapter'
import OryAuthUseCases from '@/useCases/OryAuthUseCases'
import { OrySessionEntity } from '@/domain/entities/OrySessionEntity'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const oryAuthUseCases = new OryAuthUseCases(new OryAuthAPIAdapter())

export const nextAuthOptions: NextAuthOptions = {
  
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      
      async authorize(credentials, req) {
        
        try {
          const username = credentials?.username
          const password = credentials?.password
          
          if (!username || !password) {
            console.error('username or password is missing')
            return null
          }
          
          const loginResponse: OrySessionEntity =
            await oryAuthUseCases.usernamePasswordLogin(username, password)
          
          if (!loginResponse || !loginResponse.sessionToken) {
            console.error('login failed')
            return null
          }
          
          if (loginResponse.sessionToken) {
            return {
              id: loginResponse.id,
              name: loginResponse.userInfo.name,
              email: loginResponse.userInfo.email,
              sessionToken: loginResponse.sessionToken
            }
          }
          return null
        } catch (error: any) {
          console.error('Error on authorize', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/en/signin'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token = { ...token, ...user }
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = token
      return session
    }
  }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
