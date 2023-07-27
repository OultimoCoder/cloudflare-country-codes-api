import { route as meRoute } from './me.route'

const base_path = 'v1'

export const defaultRoutes = [
  {
    path: `/${base_path}/me`,
    route: meRoute
  }
]
