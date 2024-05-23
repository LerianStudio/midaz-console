import countriesJson from '@/countries.json'

export type CountryType = {
  code: string
  name: string
  states: string[]
}

const getCountries = () => {
  return countriesJson.map((country) => ({
    code: country.code2,
    name: country.name,
    states: country.states.map((state) => state.name)
  }))
}

const getStateCountry = (countryName: string): string[] | undefined => {
  const selectedCountry = countriesJson.find(
    (country) => country.name === countryName
  )

  if (!selectedCountry) return

  return selectedCountry.states.map((state) => state.name)
}

export { getCountries, getStateCountry }
