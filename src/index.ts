import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import httpStatus from 'http-status'
import { setCors } from './middlewares/cors'
import { errorHandler } from './middlewares/error'
import { defaultRoutes } from './routes'
import { ApiError } from './utils/ApiError'

const app = new Hono<Environment>()

app.use('*', prettyJSON({ space: 2 }))
app.use('*', setCors)

app.notFound(() => {
  throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
})

app.onError(errorHandler)

defaultRoutes.forEach((route) => {
  app.route(`${route.path}`, route.route)
})

export default app
