import { NextRequest, NextResponse } from 'next/server'

import { OryAuthAPIAdapter } from '@/adapters/OryAuthAPIAdapter'
import OryAuthUseCases from '@/useCases/OryAuthUseCases'
import { OrySessionEntity } from '@/domain/entities/OrySessionEntity'

const oryAuthUseCases = new OryAuthUseCases(new OryAuthAPIAdapter())

const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { username, password } = await req.json()

    const loginResponse: OrySessionEntity =
      await oryAuthUseCases.usernamePasswordLogin(username, password)

    return NextResponse.json(loginResponse, {
      headers: {
        'Set-Cookie': loginResponse.sessionToken
      }
    })
  } catch (error: any) {
    console.error('error', error)

    return NextResponse.error()
  }
}

export { POST }
