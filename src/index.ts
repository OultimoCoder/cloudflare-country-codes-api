import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import httpStatus from 'http-status'
import { errorHandler } from './middlewares/error'
import { defaultRoutes } from './routes'
import { ApiError } from './utils/ApiError'

const app = new Hono<Environment>()

app.use('*', prettyJSON({ space: 4 }))
app.use('*', cors())

app.notFound(() => {
  throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
})

app.onError(errorHandler)

defaultRoutes.forEach((route) => {
  app.route(`${route.path}`, route.route)
})

export default app
