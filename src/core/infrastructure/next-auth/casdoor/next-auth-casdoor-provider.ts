import { AuthSessionDto } from '@/core/application/dto/auth-dto'
import { AuthLogin } from '@/core/application/use-cases/auth/auth-login-use-case'
import { AuthEntity } from '@/core/domain/entities/auth-entity'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {
  container,
  Registry
} from '../../container-registry/container-registry'

export const nextAuthCasdoorOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
    updateAge: 24 * 60 * 60
  },
  jwt: {
    maxAge: 30 * 60
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      async authorize(credentials, req) {
        try {
          const authLoginUseCase: AuthLogin = container.get<AuthLogin>(
            Registry.AuthLoginUseCase
          )
          const username = credentials?.username
          const password = credentials?.password

          if (!username || !password) {
            console.error('username or password is missing')
            return null
          }

          const loginEntity: AuthEntity = {
            grant_type: 'password',
            client_id: process.env.NEXTAUTH_CASDOOR_CLIENT_ID as string,
            client_secret: process.env.NEXTAUTH_CASDOOR_CLIENT_SECRET as string,
            username,
            password
          }

          const authLoginResponse: AuthSessionDto =
            await authLoginUseCase.execute(loginEntity)

          return authLoginResponse
        } catch (error: any) {
          console.error('Error on authorize', error)
          return null
        }
      }
    })
  ],

  pages: {
    signIn: '/signin'
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
