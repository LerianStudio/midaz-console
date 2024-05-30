'use client'
import CountrySelector from '@/components/CountrySelector'
import StateSelector from '@/components/StateSelector'
import { Button } from '@/components/ui/button/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const schema = z.object({
  country: z.string().refine((value) => value.length > 0, {
    message: 'Country is required'
  }),
  state: z.string().refine((value) => value.length > 0, {
    message: 'State is required'
  })
})

type ImplementationSchema = z.infer<typeof schema>

const Page = () => {
  const implementationForm = useForm<ImplementationSchema>({
    resolver: zodResolver(schema),
    values: {
      country: '',
      state: ''
    }
  })

  const handleSubmitForm = (data: ImplementationSchema) => {
    alert(`Country: ${data.country}, State: ${data.state}`)
  }

  return (
    <div>
      <h1>Implementation</h1>
      <Form {...implementationForm}>
        <form onSubmit={implementationForm.handleSubmit(handleSubmitForm)}>
          <FormField
            control={implementationForm.control}
            name="country"
            render={(field) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <CountrySelector
                    {...implementationForm.register('country')}
                    className="mt-2"
                    country={implementationForm.watch('country')}
                    onSelectCountry={field.field.onChange}
                    {...field.field}
                    ref={field.field.ref}
                  />
                </FormControl>
                <FormMessage></FormMessage>
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
                    country={implementationForm.watch('country')}
                    state={field.field.value}
                    onSelectState={field.field.onChange}
                    {...field.field}
                  />
                </FormControl>
                <FormMessage/>
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
