import countriesJson from '@/countries.json'

export type CountryType = {
  code: string
  name: string
  states: StateType[]
}

export type StateType = {
  name: string
  code: string
}

const getCountries = () => {
  return countriesJson.map((country) => ({
    code: country.code2,
    name: country.name,
    states: country.states.map(
      (state: StateType): StateType => ({
        name: state.name,
        code: state.code
      })
    )
  }))
}

const getCountryByNameOrCode = (country: string): CountryType => {
  return (
    getCountries().find(
      (countryItem) =>
        countryItem.code === country || countryItem.name === country
    ) || ({} as CountryType)
  )
}

const getStateCountry = (country: string): StateType[] => {
  const selectedCountry = getCountries().find(
    (countryItem) =>
      countryItem.code === country || countryItem.name === country
  )

  if (!selectedCountry) return [] as StateType[]

  return selectedCountry.states || ([] as StateType[])
}

const getStateByCodeOrName = (
  stateList: StateType[],
  state: string
): StateType => {
  if (!stateList) return {} as StateType
  return (
    stateList.find(
      (stateItem) => stateItem.code === state || stateItem.name === state
    ) || ({} as StateType)
  )
}

export {
  getCountries,
  getStateCountry,
  getCountryByNameOrCode,
  getStateByCodeOrName
}
