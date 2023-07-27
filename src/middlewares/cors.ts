import { MiddlewareHandler } from 'hono'
import { cors } from 'hono/cors'
import { getConfig } from '../config/config'

export const setCors: MiddlewareHandler<Environment> = async (c, next) => {
  const config = getConfig(c.env)
  cors({ origin: config.cors.origins, allowMethods: ['GET', 'OPTIONS'] })(c, next)
}
