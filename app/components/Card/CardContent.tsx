'use client'

import { cn } from '@/lib/utils'
import { CardContent } from '../ui/card/card'
import { Input } from '../ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button/button'

const formSchema = z.object({
  name: z.string()
})

export const CustomCardContent = ({ data, text, className }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data ? { name: data.name } : {}
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <CardContent className="p-0">
      {text && (
        <h2 className={cn('font-extrabold text-[#52525B]', className)}>
          {text}
        </h2>
      )}

      {data && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Ledger</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </CardContent>
  )
}
