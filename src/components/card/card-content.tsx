'use client'

import { cn } from '@/lib/utils'
import { CardContent } from '../ui/card/card'
import { Input } from '../ui/input/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useFormState } from '@/context/form-details-context'
import { Label } from '../ui/label/label'

const formSchema = z.object({
  name: z.string()
})

export const CustomCardContent = ({ data, text, className }: any) => {
  const { updateFormData, markAsDirty } = useFormState()

  const { register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data ? { name: data.name } : {}
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    markAsDirty()
    updateFormData({ name: newName })
  }

  return (
    <CardContent className="p-0">
      {text && (
        <h2 className={cn('font-extrabold text-[#52525B]', className)}>
          {text}
        </h2>
      )}

      {data && (
        <div className="mt-3 flex flex-col gap-4">
          <Label>Nome do Ledger</Label>
          <Input {...register('name')} onChange={handleNameChange} />
        </div>
      )}
    </CardContent>
  )
}
