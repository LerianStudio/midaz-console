'use client'
import CountrySelector from '@/components/CountrySelector'
import { useEffect, useState } from 'react'
import StateSelector from '@/components/StateSelector'
import { Button } from '@/components/ui/button/button'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'

const ImplementationSchema = z.object({
  country: z.string(),
  state: z.string()
})

const Page = () => {
  const implementationForm = useForm<z.infer<typeof ImplementationSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(ImplementationSchema),
    values: {
      country: 'BR',
      state: ''
    }
  })

  const onSelectCountry = (countryCode: string) => {
    implementationForm.setValue('country', countryCode)
    implementationForm.setValue('state', '')
  }

  const onSelectState = (stateCode: string) => {
    implementationForm.setValue('state', stateCode)
    alert(JSON.stringify(implementationForm.getValues(), null, 2))
  }

  const handleSubmit = (data: z.infer<typeof ImplementationSchema>) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div>
      <h1>Implementation</h1>
      <Form {...implementationForm}>
        <form onSubmit={implementationForm.handleSubmit(handleSubmit)}>
          <FormField
            control={implementationForm.control}
            name="country"
            render={(field) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelector
                    className="mt-2"
                    country={implementationForm.watch('country')}
                    onSelectCountry={onSelectCountry}
                    {...field.field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={implementationForm.control}
            name="state"
            render={(field) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <StateSelector
                    onSelectState={onSelectState}
                    country={implementationForm.getValues('country')}
                    state={field.field.value}
                    {...field.field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Page
