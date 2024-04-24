import { OryAuthRepository } from '@/repositories/OryAuthRepository'
import process from 'node:process'
import { OryCreateLoginFlowResponseDTO } from '@/domain/dto/OryResponseDTO'
import { OrySubmitLoginRequestDTO } from '@/domain/dto/OryRequestDTO'
import { OrySessionEntity } from '@/domain/entities/OrySessionEntity'

export class OryAuthAPIAdapter implements OryAuthRepository {
  readonly baseUrl: string = process.env.ORY_KRATOS_PUBLIC_URL + ''

  create(data: any): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getById(id: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  list(): Promise<any[]> {
    throw new Error('Method not implemented.')
  }

  update(id: string, data: any): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async createLoginFlow(): Promise<OryCreateLoginFlowResponseDTO> {
    const oryCreateLoginFlowUrl = this.baseUrl + '/self-service/login/browser'

    const data = await fetch(oryCreateLoginFlowUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    const oryLoginResponseJson = await data.json()
    const csrfCookie = this.getCsrfCookieFromHeaders(data.headers)
    const csrfToken = this.getCsrfTokenFromNodes(oryLoginResponseJson.ui.nodes)

    return {
      nextActionUrl: oryLoginResponseJson.ui.action,
      csrfToken: csrfToken,
      csrfCookie: csrfCookie
    }
  }

  async submitLoginFlow(
    submitLoginData: OrySubmitLoginRequestDTO
  ): Promise<OrySessionEntity> {
    const data = await fetch(submitLoginData.nextActionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: submitLoginData.csrfCookie
      },
      body: JSON.stringify({
        identifier: submitLoginData.identifier,
        password: submitLoginData.password,
        method: 'password',
        csrf_token: submitLoginData.csrfToken
      })
    })

    const json = await data.json()

    return {
      id: json.session.id,
      sessionId: json.session.id,
      sessionToken: this.getSessionCookieFromHeaders(data.headers),
      active: json.session.active,
      expiresAt: json.session.expires_at,
      authenticatedAt: json.session.authenticated_at,
      userInfo: {
        ...json.session.identity.traits
      }
    }
  }

  private getCsrfTokenFromNodes(nodes: any[]): string {
    const csrfNode = nodes.find(
      (node) => node.attributes && node.attributes.name === 'csrf_token'
    )

    if (!csrfNode) {
      throw new Error('Csrf token not found')
    }

    return csrfNode.attributes.value
  }

  private getCsrfCookieFromHeaders(headers: Headers): string {
    const csrfCookie = headers
      .getSetCookie()
      .find((cookie) => cookie.startsWith('csrf_token'))
      ?.split(';')[0]

    if (!csrfCookie) {
      throw new Error('Csrf cookie not found')
    }

    return csrfCookie
  }

  private getSessionCookieFromHeaders(headers: Headers): string {
    const sessionCookie = headers
      .getSetCookie()
      .find((cookie) => cookie.startsWith('ory_kratos_session'))
      ?.split(';')[0]

    if (!sessionCookie) {
      throw new Error('Ory Kratos Session cookie not found')
    }

    return sessionCookie
  }
}
