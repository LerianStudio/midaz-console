import { NextRequest } from 'next/server'
import { NextHandler } from '@/lib/applymiddleware/types'
import { v4 as uuidv4 } from 'uuid'

export function requestIdMiddleware() {
  return async (req: NextRequest, next: NextHandler) => {
    const existingMidazId = req.headers.get('X-Midaz-Id')
    const midazId = `${uuidv4()}`

    if (!existingMidazId) {
      req.headers.set('X-Midaz-Id', midazId)
    }

    return next()
  }
}
