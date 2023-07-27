import { getCountryInfo } from '../../../src/services/country.service'

describe('getCountryInfo', () => {
  test('should return country and info for existing country code', async () => {
    const countryInfo = getCountryInfo('US')
    expect(countryInfo).toEqual({
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
  test('should return null for non existant country code', async () => {
    const countryInfo = getCountryInfo('XX')
    expect(countryInfo).toBeNull()
  })
})
