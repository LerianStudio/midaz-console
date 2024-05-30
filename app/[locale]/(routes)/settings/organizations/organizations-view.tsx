'use client'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { organizationFormSchema } from '@/[locale]/(routes)/settings/organizations/organizations-form-schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input/input'
import { Button } from '@/components/ui/button/button'
import { Camera, ChevronDown, ChevronUp, HashIcon, Plus, Trash } from 'lucide-react'
import { Collapsible } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label/label'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar'
import { ChromePicker } from 'react-color'
import { isHexColor } from '@/utils/colorUtils'
import CountrySelector from '@/components/CountrySelector'
import StateSelector from '@/components/StateSelector'
import useCustomToast from '@/hooks/useCustomToast'

type OrganizationsViewProps = {
  organizations?: OrganizationEntity
  onSubmit: (data: any) => void
}

const OrganizationsView = ({
                             organizations,
                             onSubmit
                           }: OrganizationsViewProps) => {
  const t = useTranslations('organizations.organizationView')
  const router = useRouter()
  const isNewOrganization: boolean = organizations === undefined
  const [showChormePicker, setShowChormePicker] = useState(false)
  const [colorSelected, setColorSelected] = useState(getAccentColor())
  const [showInputAvatarDialog, setShowInputAvatarDialog] = useState(false)
  const [avatarURL, setAvatarURL] = useState('')
  const [currentMetadata, setCurrentMetadata] = useState({ key: '', value: '' })
  const [metadataList, setMetadataList] =
    useState<Record<string, any>>(getMetadataItems())
  const [showMetadataCollapse, setShowMetadataCollapse] = useState(false)
  const { showSuccess, showError } = useCustomToast()
  
  const organizationForm = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    values: organizations
  })
  
  
  function getAccentColor() {
    if (
      organizations &&
      organizations.metadata &&
      organizations.metadata.organizationAccentColor &&
      isHexColor(organizations.metadata.organizationAccentColor)
    ) {
      return organizations.metadata.organizationAccentColor
    }
    return ''
  }
  
  function getMetadataItems() {
    return Object.fromEntries(
      Object.entries<Record<string, any>>(organizations?.metadata || {}).filter(
        ([key]) => {
          return (
            key !== 'organizationAccentColor' && key !== 'organizationAvatar'
          )
        }
      )
    )
  }
  
  const handleMetadataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'key' | 'value'
  ) => {
    e.preventDefault()
    
    setCurrentMetadata({
      ...currentMetadata,
      [field]: (e.target as HTMLInputElement).value
    })
  }
  
  const handlerAddMetadata = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentMetadata.key && currentMetadata.value) {
      const newMetadataItem = {
        ...currentMetadata
      }
      
      setMetadataList((prev) => ({
        ...prev,
        [newMetadataItem.key]: newMetadataItem.value
      }))
      
      setCurrentMetadata({ key: '', value: '' })
    }
  }
  
  const handlerRemoveMetadata = (key: string) => {
    const newMetadata = { ...metadataList }
    delete newMetadata[key]
    
    setMetadataList(newMetadata)
  }
  
  const onSelectCountry = (countryCode: string) => {
    organizationForm.setValue('address.country', countryCode)
    onSelectState('')
  }
  
  const onSelectState = (stateCode: string) => {
    organizationForm.setValue('address.state', stateCode)
  }
  
  const handleFormSubmit = async () => {
    
    
    // const data = organizationForm.getValues()
    // data.metadata = {
    //   ...data.metadata,
    //   ...metadataList,
    //   organizationAccentColor: colorSelected
    // }
    //
    // // Prevent description saved as empty string or null
    // if (data.status && data.status.description && false) {
    //   data.status.description = 'description of status'
    // }
    //
    // const country = getCountryByNameOrCode(data.address.country)
    // data.address.country = country.code
    // data.address.state = getStateByCodeOrName(
    //   country.states,
    //   data.address.state
    // ).code
    //
    // const result = organizationFormSchema.safeParse(data)
    // if (result.success) {
    //   onSubmit(data)
    // } else {
    //   result.error.errors.forEach((error) => {
    //     error.path.forEach((path) => {
    //       return organizationForm.setError(path as any, {
    //         type: 'manual',
    //         message: error.message
    //       })
    //     })
    //   })
    // }
    showSuccess('Organization created successfully')
  }
  
  return (
    <div className="w-full justify-between">
      <Form {...organizationForm}>
        <form onSubmit={organizationForm.handleSubmit(handleFormSubmit)}>
          <div>
            <div className="mb-16 flex gap-6">
              <div className="grow">
                <div className="mb-6 rounded-lg bg-white shadow">
                  <div className="p-6 text-sm font-medium text-zinc-400">
                    {t(
                      isNewOrganization
                        ? 'newOrganization.description'
                        : 'editOrganization.description'
                    )}
                  </div>
                  <div className="border-t border-zinc-300">
                    <div>
                      {/*Organization Basic Information Section*/}
                      
                      <div className="grid grid-cols-2 gap-5 p-6">
                        {!isNewOrganization && (
                          <FormField
                            control={organizationForm.control}
                            name="id"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm text-zinc-600">
                                  {t('formFields.id')}
                                </FormLabel>
                                <Input
                                  className="placeholder:text-sm placeholder:font-medium placeholder:text-zinc-400 disabled:bg-zinc-100"
                                  placeholder={t('typePlaceholder')}
                                  disabled
                                  {...field}
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        
                        <FormField
                          control={organizationForm.control}
                          name="legalName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.legalName')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="doingBusinessAs"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.doingBusinessAs')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="legalDocument"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.legalDocument')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/*Address Field Section*/}
                    
                    <div className="border-t border-zinc-300">
                      <div className="grid grid-cols-2 gap-5 p-6">
                        <FormField
                          control={organizationForm.control}
                          name="address.line1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.address')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="address.line2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.complement')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="address.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.country')}
                              </FormLabel>
                              <CountrySelector
                                className="mt-2"
                                country={organizationForm.watch(
                                  'address.country'
                                )}
                                onSelectCountry={onSelectCountry}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="address.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                itemID={field.name}
                                className="text-sm text-zinc-600"
                              >
                                {t('formFields.state')}
                              </FormLabel>
                              <StateSelector
                                onSelectState={onSelectState}
                                country={organizationForm.watch(
                                  'address.country'
                                )}
                                state={field.value}
                                className="w-fit mt-2 placeholder:text-sm  placeholder:font-medium placeholder:text-zinc-400 enabled:w-fit disabled:w-[124px] disabled:bg-zinc-100"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="address.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.city')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={organizationForm.control}
                          name="address.zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.zipCode')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/*Parent Id Field Section*/}
                    
                    <div className="border-t border-zinc-300">
                      <div className="grid grid-cols-2 gap-5 p-6">
                        <FormField
                          control={organizationForm.control}
                          name="parentOrganizationId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-zinc-600">
                                {t('formFields.parentOrganization')}
                              </FormLabel>
                              <Input
                                placeholder={t('typePlaceholder')}
                                {...field}
                              />
                              <p className="text-xs font-medium text-zinc-400">
                                {t('informationText.parentOrganizationText')}
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/*Metadata Section*/}
                
                <div className="rounded-lg bg-white shadow">
                  <div className="p-6 text-sm font-medium text-zinc-400">
                    <div className="w-full flex-col">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-medium text-zinc-600 ">
                            Metadata
                          </div>
                          
                          <p className="self-stretch text-xs font-normal italic text-zinc-400">
                            {t('informationText.metadataRegisterCountText', {
                              registerCount: Object.keys(metadataList).length
                            })}
                          </p>
                        </div>
                        
                        <div className="content-end justify-end">
                          {!showMetadataCollapse ? (
                            <ChevronDown
                              onClick={() =>
                                setShowMetadataCollapse(!showMetadataCollapse)
                              }
                              color="#3F3F46"
                            />
                          ) : (
                            <ChevronUp
                              onClick={() =>
                                setShowMetadataCollapse(!showMetadataCollapse)
                              }
                              color="#3F3F46"
                            />
                          )}
                        </div>
                      </div>
                      
                      {showMetadataCollapse && (
                        <div className="mt-6 w-full border-t">
                          <div>
                            <div className="flex w-full">
                              <Collapsible
                                className="flex w-full"
                                open={showMetadataCollapse}
                                asChild
                              >
                                {
                                  <div className="mt-6 flex w-full items-center justify-between">
                                    <div className="flex w-full flex-col">
                                      <div className="mt-2 flex w-full flex-col ">
                                        <div className="flex gap-5">
                                          <div className="flex w-full items-center justify-between gap-2">
                                            <div className="flex w-full flex-col gap-2">
                                              <Label htmlFor="key">Chave</Label>
                                              <Input
                                                id="key"
                                                value={currentMetadata.key}
                                                onChange={(
                                                  e: React.ChangeEvent<HTMLInputElement>
                                                ) =>
                                                  handleMetadataChange(e, 'key')
                                                }
                                                placeholder="Key"
                                                className="h-9 items-center justify-between"
                                              />
                                            </div>
                                            
                                            <div className="flex w-full flex-col gap-2">
                                              <Label htmlFor="value">
                                                Valor
                                              </Label>
                                              <Input
                                                id="value"
                                                value={currentMetadata.value}
                                                onChange={(
                                                  e: React.ChangeEvent<HTMLInputElement>
                                                ) =>
                                                  handleMetadataChange(
                                                    e,
                                                    'value'
                                                  )
                                                }
                                                placeholder="Value"
                                                className="h-9"
                                              />
                                            </div>
                                          </div>
                                          
                                          <Button
                                            onClick={(
                                              e: React.MouseEvent<HTMLButtonElement>
                                            ) => handlerAddMetadata(e)}
                                            className="h-9 w-9 self-end rounded-full bg-shadcn-600 disabled:bg-shadcn-200"
                                            disabled={
                                              !currentMetadata.key ||
                                              !currentMetadata.value
                                            }
                                          >
                                            <Plus
                                              size={16}
                                              className={cn(
                                                'shrink-0',
                                                !currentMetadata.key ||
                                                !currentMetadata.value
                                                  ? 'text-shadcn-400'
                                                  : 'text-white'
                                              )}
                                            />
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        {Object.entries(metadataList).map(
                                          ([key, value], index) => (
                                            <div
                                              key={index}
                                              className="mt-2 flex items-center justify-between"
                                            >
                                              <div className="flex w-full gap-5">
                                                <div className="flex flex-1 gap-2">
                                                  <div
                                                    className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
                                                    {key}
                                                  </div>
                                                  <div
                                                    className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
                                                    {value}
                                                  </div>
                                                </div>
                                                <Button
                                                  onClick={() =>
                                                    handlerRemoveMetadata(key)
                                                  }
                                                  className="group h-9 w-9 rounded-full border border-shadcn-200 bg-white hover:border-none"
                                                >
                                                  <Trash
                                                    size={16}
                                                    className="shrink-0 text-black group-hover:text-white"
                                                  />
                                                </Button>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                }
                              </Collapsible>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <FormMessage />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grow">
                <div className="mb-6 rounded-lg bg-white shadow">
                  <div className="p-6">
                    <div className="mb-4 text-sm font-medium text-zinc-600">
                      {t('formFields.avatar')}
                    </div>
                    
                    <div className="mb-4 flex w-full justify-center pb-0">
                      <Dialog
                        open={showInputAvatarDialog}
                        onOpenChange={setShowInputAvatarDialog}
                      >
                        <DialogTrigger
                          onClick={() => setShowInputAvatarDialog(true)}
                        >
                          <Avatar
                            className="flex h-44 w-44 items-center justify-center rounded-[30px] border border-zinc-300 bg-zinc-200 shadow">
                            <AvatarImage
                              className="h-44 w-44 gap-2 rounded-[30px] border border-zinc-200 shadow"
                              src={organizationForm.getValues(
                                'metadata.organizationAvatar'
                              )}
                            />
                            <AvatarFallback
                              className="flex h-10 w-10 gap-2 rounded-full border border-zinc-200 bg-white p-2 shadow">
                              <Camera className="relative h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                        </DialogTrigger>
                        
                        <DialogContent>
                          <DialogTitle className="flex w-full items-center justify-center">
                            {t('avatarDialog.title')}
                          </DialogTitle>
                          <DialogDescription className="flex w-full items-center justify-center">
                            {t('avatarDialog.description')}
                          </DialogDescription>
                          
                          <Input
                            className="mt-4"
                            placeholder="https://example.com/image.png"
                            onChange={(e) => setAvatarURL(e.target.value)}
                          />
                          
                          <Button
                            variant="outline"
                            onClick={() => {
                              organizationForm.setValue(
                                'metadata.organizationAvatar',
                                avatarURL
                              )
                              setShowInputAvatarDialog(false)
                            }}
                          >
                            {t('avatarDialog.button')}
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    {organizationForm.getValues(
                      'metadata.organizationAvatar'
                    ) === '' ||
                    organizationForm.getValues(
                      'metadata.organizationAvatar'
                    ) === undefined ? (
                      <div className="w-fit justify-start whitespace-pre-wrap text-xs font-medium text-zinc-400">
                        <p>{t('informationText.avatarInformationText')}</p>
                      </div>
                    ) : (
                      <div className="flex w-full content-center items-center justify-center self-center">
                        <Button
                          className="justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm shadow"
                          variant="outline"
                          size="default"
                          onClick={() => {
                            setAvatarURL('')
                            organizationForm.setValue(
                              'metadata.organizationAvatar',
                              ''
                            )
                          }}
                        >
                          {t('remove')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="rounded-lg bg-white shadow">
                  <div className="p-6">
                    <div className="text-sm font-medium text-zinc-600">
                      {t('formFields.accentColor')}
                    </div>
                    
                    <div>
                      <div className="inline-flex h-10 w-[180px] items-start justify-start gap-2 rounded-lg">
                        <div
                          className="h-9 w-9 rounded-md border border-zinc-300"
                          style={{
                            backgroundColor:
                              colorSelected !== '' ? colorSelected : '#FFFFFF'
                          }}
                          onClick={() => setShowChormePicker(!showChormePicker)}
                        />
                        <div
                          className="flex h-9 shrink grow basis-0 items-center justify-start rounded-md border border-zinc-300 px-2"
                          onClick={() => setShowChormePicker(!showChormePicker)}
                        >
                          <div className="relative h-5 w-5">
                            <div className="flex w-full">
                              <div>
                                <HashIcon className="size-6 text-zinc-400" />
                              </div>
                              <div className="pl-1.5 text-sm font-medium text-zinc-400">
                                {colorSelected.split('#')}
                              </div>
                            </div>
                          </div>
                          <div className="flex h-[38px] shrink grow basis-0 items-center justify-start px-1.5 py-2.5" />
                        </div>
                      </div>
                      {colorSelected === '' && (
                        <div className="mt-4 whitespace-pre-wrap text-xs font-medium text-zinc-400">
                          {t('informationText.accentColorInformationText')}
                        </div>
                      )}
                    </div>
                    {showChormePicker && (
                      <div>
                        <ChromePicker
                          color={colorSelected}
                          className="absolute"
                          disableAlpha={true}
                          onChange={(color) => setColorSelected(color.hex)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <footer
              className=" bottom-0 inline-flex h-[102px] w-full items-center justify-end gap-6 self-baseline rounded-none bg-white shadow">
              <div className="mr-10 flex items-center justify-end gap-6">
                <Button
                  className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm shadow"
                  variant="outline"
                  size="default"
                  type="button"
                  onClick={() => {
                    router.back()
                  }}
                >
                  {t('cancel')}
                </Button>
                <Button
                  className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-zinc-800 px-4 py-2 text-sm text-white shadow"
                  variant="outline"
                  size="default"
                  type="submit"
                >
                  {t(
                    isNewOrganization
                      ? 'newOrganization.button'
                      : 'editOrganization.button'
                  )}
                </Button>
              </div>
            </footer>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default OrganizationsView
