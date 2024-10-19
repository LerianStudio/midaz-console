import {
  AuthEntity,
  AuthResponseEntity,
  AuthSessionEntity
} from '@/core/domain/entities/auth-entity'
import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
import { UnauthorizedException } from '@/core/infrastructure/errors/http-exceptions'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

export class CasdoorAuthLoginRepository implements AuthLoginRepository {
  private readonly casdoorBaseUrl: string = process.env
    .NEXTAUTH_CASDOOR_AUTH_URL as string

  async login(loginData: AuthEntity): Promise<AuthSessionEntity> {
    const url = `${this.casdoorBaseUrl}/api/login/oauth/access_token`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })

    const authLogin: AuthResponseEntity = await response.json()

    if (!response.ok) {
      console.error('Casdoor login failed')
      throw new UnauthorizedException('Casdoor login failed')
    }

    const jwtPauload: JwtPayload = jwt.decode(
      authLogin.access_token
    ) as JwtPayload

    const authSession: AuthSessionEntity = {
      id: jwtPauload.sub as string,
      username: jwtPauload.name,
      name: jwtPauload.displayName,
      access_token: authLogin.access_token,
      refresh_token: authLogin.refresh_token
    }

    return authSession
  }
}
