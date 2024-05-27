'use client'
import CountrySelector from '@/components/CountrySelector'
import { useState } from 'react'
import StateSelector from '@/components/StateSelector'
import { Button } from '@/components/ui/button/button'

const Page = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('BR')
  const [selectedState, setSelectedState] = useState<string>('')

  const onSelectCountry = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setSelectedState('')
  }

  const onSelectState = (stateCode: string) => {
    setSelectedState(stateCode)
  }

  return (
    <div>
      <h1>Implementation</h1>
      <CountrySelector
        className="mt-2"
        country={selectedCountry}
        onSelectCountry={onSelectCountry}
      />
      <StateSelector
        onSelectState={onSelectState}
        country={selectedCountry}
        state={selectedState}
      />

      <Button
        onClick={() =>
          alert(`Country ${selectedCountry} - State ${selectedState}`)
        }
      >
        Submit
      </Button>
    </div>
  )
}

export default Page
