'use client'
import { inputSchema } from './input-schema'
import type { InputType } from './input-type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input/input'
import React from 'react'
import { Button } from '@/components/ui/button/button'
import { getSchemaDefaultValues } from '@/utils/zodUltils'

type InputFormProps = {
  data?: InputType
}

const Page = ({ data }: InputFormProps) => {
  data = {
    id: '1',
    name: 'John Doe',
    document: '123456789',
    status: {
      code: 'active',
      description: 'Active'
    },
    metadata: {
      age: '36',
      favoriteColor: 'blue'
    }
  }

  const inputForm = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: data ? data : getSchemaDefaultValues(inputSchema)
  })

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="grid grow grid-cols-2 gap-6">
      <Form {...inputForm}>
        <form onSubmit={inputForm.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={inputForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 disabled:bg-zinc-100"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="document"
            control={inputForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 disabled:bg-zinc-100"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="status.code"
            control={inputForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Code</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 disabled:bg-zinc-100"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="status.description"
            control={inputForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Description</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 disabled:bg-zinc-100"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default Page
