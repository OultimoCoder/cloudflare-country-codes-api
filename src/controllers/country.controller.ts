import { Handler } from 'hono'
import httpStatus from 'http-status'
import * as countryService from '../services/country.service'
import { ApiError } from '../utils/ApiError'

const COUNTRY_NOT_FOUND_ERR = new ApiError(httpStatus.NOT_FOUND, 'Country not found')

export const me: Handler<Environment> = async (c) => {
  const country = c.req.header('cf-ipcountry')?.toLowerCase()
  if (!country || country === 'xx') {
    throw COUNTRY_NOT_FOUND_ERR
  }
  const countryInfo = countryService.getCountryInfo(country)
  if (!countryInfo) {
    throw COUNTRY_NOT_FOUND_ERR
  }
  return c.json(countryInfo, httpStatus.OK)
}
