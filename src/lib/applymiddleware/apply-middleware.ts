import { NextRequest } from 'next/server'
import { MiddlewareHandler, NextHandler, RouteHandler } from './types'

export function applyMiddleware(
  middlewares: MiddlewareHandler[],
  action: RouteHandler
) {
  return async (req: NextRequest, ...args: any) => {
    let i = 0

    const next: NextHandler = async (err) => {
      const localReq = req.clone() as NextRequest

      if (err != null) {
        return await action(req, ...args)
      }

      if (i >= middlewares.length) {
        return await action(req, ...args)
      }

      const layer = middlewares[i++]
      try {
        return await layer(localReq, next)
      } catch (error) {
        console.log(error)
        return await next(error)
      }
    }

    return await next()
  }
}
