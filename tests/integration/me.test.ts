import httpStatus from 'http-status'
import { request } from '../utils/testRequest'

describe('Me Routes', () => {
  describe('GET /me', () => {
    test('should return 200 and country information for valid country header', async () => {
      const res = await request('/me', { method: 'GET', headers: { 'CF-IPCountry': 'US' } })
      const body = await res.json()
      expect(res.status).toBe(httpStatus.OK)
      expect(body).toEqual({
        alpha2: 'US',
        alpha3: 'USA',
        countryCallingCodes: ['+1'],
        currencies: ['USD'],
        emoji: '🇺🇸',
        ioc: 'USA',
        languages: ['eng'],
        name: 'United States',
        status: 'assigned'
      })
    })
    test('should return 404 for Cloudflare country code XX', async () => {
      const res = await request('/me', { method: 'GET', headers: { 'CF-IPCountry': 'XX' } })
      expect(res.status).toBe(httpStatus.NOT_FOUND)
    })
    test('should return 404 for not found Cloudflare country header', async () => {
      const res = await request('/me', { method: 'GET' })
      expect(res.status).toBe(httpStatus.NOT_FOUND)
    })
    test('should return 404 for not found country code', async () => {
      const res = await request('/me', { method: 'GET', headers: { 'CF-IPCountry': 'USAD' } })
      expect(res.status).toBe(httpStatus.NOT_FOUND)
    })
  })
})
