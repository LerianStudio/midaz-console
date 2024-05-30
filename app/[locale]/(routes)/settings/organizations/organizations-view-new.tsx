'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input/input'
import React from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button/button'
import CountrySelector from '@/components/CountrySelector'
import StateSelector from '@/components/StateSelector'
import { Label } from '@radix-ui/react-label'
import { organizationsFormSchemaNew } from '@/[locale]/(routes)/settings/organizations/organizations-form-schema-new'

type OrganizationsViewNewProps = {
  data?: typeof organizationsFormSchemaNew
}

const OrganizationsViewNew = () => {
  const t = useTranslations('organizations.organizationView')
  type OrganizationsFormSchema = z.infer<typeof organizationsFormSchemaNew>
  
  
  const organizationForm = useForm<OrganizationsFormSchema>({
    resolver: zodResolver(organizationsFormSchemaNew)
  })
  
  function handleOrganizationSubmit(data: OrganizationsFormSchema) {
    alert(`Data: ${JSON.stringify(data)}`)
  }
  //
  // const onSelectCountry = (countryCode: string) => {
  //   organizationForm.setValue('address.country', countryCode)
  //   organizationForm.reset({ address: { state: '' } })
  //   onSelectState('')
  // }
  //
  // const onSelectState = (stateCode: string) => {
  //   organizationForm.setValue('address.state', stateCode)
  // }
  
  return (
    <div>
      <Form {...organizationForm}>
        <form onSubmit={organizationForm.handleSubmit(handleOrganizationSubmit)}>
          <FormField
            control={organizationForm.control}
            name="legalName"
            render={({ field }) => (
              <FormItem >
                <FormLabel className="text-sm text-zinc-600">
                  {t('formFields.legalName')}
                </FormLabel>
                  <Input
                    placeholder={t('typePlaceholder')}
                    {...field}
                  />
                {organizationForm.formState.errors.legalName && (
                  <p>{t(`formFieldErros.${organizationForm.formState.errors.legalName.message?.toLowerCase()}`)}</p>
                )}
                
              </FormItem>
            )}
          />
          
          
          <Button type="submit">
            {t('newOrganization.button')}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default OrganizationsViewNew