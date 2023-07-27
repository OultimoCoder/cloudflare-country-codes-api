import { lookup } from 'country-data-list'

export const getCountryInfo = (countryCode: string) => {
  const country = lookup.countries({ alpha2: countryCode })
  return country.length > 0 ? country[0] : null
}
