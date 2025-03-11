import {
  AuthEntity,
  AuthResponseEntity,
  AuthSessionEntity
} from '@/core/domain/entities/auth-entity'
import { AuthLoginRepository } from '@/core/domain/repositories/auth/auth-login-repository'
import { UnauthorizedException } from '@/core/infrastructure/errors/http-exceptions'
import { injectable } from 'inversify'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

@injectable()
export class LerianAuthLoginRepository implements AuthLoginRepository {
  private readonly authBaseUrl: string = process.env
    .NEXTAUTH_AUTH_SERVICE_URL as string

  async login(loginData: AuthEntity): Promise<AuthSessionEntity> {
    const url = `${this.authBaseUrl}/v1/login/oauth/access_token`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })

    const authLogin: AuthResponseEntity = await response.json()

    if (!response.ok) {
      console.error('Auth login failed')
      throw new UnauthorizedException('Auth login failed')
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
