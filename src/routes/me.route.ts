import { Hono } from 'hono'
import * as countryController from '../controllers/country.controller'

export const route = new Hono<Environment>()

route.get('/', countryController.me)
