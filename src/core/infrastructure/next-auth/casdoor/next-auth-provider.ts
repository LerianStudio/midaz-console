import { container } from '../../container-registry/container-registry'
import { AuthSessionDto } from '@/core/application/dto/auth-dto'
import {
  AuthLogin,
  AuthLoginUseCase
} from '@/core/application/use-cases/auth/auth-login-use-case'
import { AuthEntity } from '@/core/domain/entities/auth-entity'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60,
    updateAge: 24 * 60 * 60
  },
  jwt: {
    maxAge: 30 * 60
  },
  debug: false,
  logger: {
    error(code, metadata) {
      console.error(code, metadata)
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      type: 'credentials',

      async authorize(credentials, req) {
        try {
          const authLoginUseCase: AuthLogin =
            container.get<AuthLogin>(AuthLoginUseCase)
          const username = credentials?.username
          const password = credentials?.password

          if (!username || !password) {
            console.error('username or password is missing')
            return null
          }

          const loginEntity: AuthEntity = {
            grant_type: 'password',
            client_id: process.env.NEXTAUTH_AUTH_SERVICE_CLIENT_ID as string,
            client_secret: process.env
              .NEXTAUTH_AUTH_SERVICE_CLIENT_SECRET as string,
            username,
            password
          }

          const authLoginResponse: AuthSessionDto =
            await authLoginUseCase.execute(loginEntity)

            console.log('authLoginResponse', authLoginResponse)

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
      console.log('jwt', token, user)
      if (user) {
        token = { ...token, ...user }
      }
      return token
    },
    session: async ({ session, token }) => {
      console.log('session', session, token)
      session.user = token
      return session
    }
  }
}
