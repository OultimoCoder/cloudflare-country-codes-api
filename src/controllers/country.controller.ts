import { Handler } from 'hono'
import httpStatus from 'http-status'
import * as countryService from '../services/country.service'
import { ApiError } from '../utils/ApiError'

const countryNotFound = new ApiError(httpStatus.NOT_FOUND, 'Country not found')

export const me: Handler<Environment> = async (c) => {
  const country = c.req.header('cf-ipcountry')?.toLowerCase()
  if (!country || country == 'xx') {
    return countryNotFound
  }
  const countryInfo = countryService.getCountryInfo(country)
  if (!countryInfo) {
    return countryNotFound
  }
  return c.json(countryInfo, httpStatus.OK)
}
