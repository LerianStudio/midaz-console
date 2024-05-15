'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card/card'
import { Button } from '@/components/ui/button/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input/input'
import React, { useEffect, useRef, useState } from 'react'
import { organizationFormSchema } from '@/[locale]/(routes)/settings/organizations/organizations-form-schema'
import { Collapsible } from '@/components/ui/collapsible'
import {
  Camera,
  ChevronDown,
  ChevronUp,
  HashIcon,
  Plus,
  Trash
} from 'lucide-react'
import { OrganizationEntity } from '@/domain/entities/OrganizationEntity'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label/label'
import { useTranslations } from 'next-intl'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar/avatar'
import { ChromePicker } from 'react-color'

type OrganizationsViewProps = {
  organizations?: OrganizationEntity
  description: string
}

const OrganizationsView = ({
  organizations,
  description
}: OrganizationsViewProps) => {
  const t = useTranslations(
    organizations
      ? 'organizations.editOrganization'
      : 'organizations.newOrganization'
  )
  const [showChormePicker, setShowChormePicker] = useState(false)
  const [colorSelected, setColorSelected] = useState('#ee0707')
  const chromePicker = useRef(null)

  useEffect(() => {
    if (!showChormePicker) {
      return
    }

    // function handleClickOutside(event: any) {
    //   // if (chromePicker?.current) {
    //   if (!chromePicker.current?.contains(event.target)) {
    //     setShowChormePicker(false)
    //   }
    // }

    // window.addEventListener('click', handleClickOutside)
    // return () => window.removeEventListener('click', handleClickOutside)
  }, [showChormePicker])

  const onColorPickerInfoChange = (color: any) => {
    console.log(color.hex)
    setColorSelected(color.hex)
  }

  const handleColorPicker = () => {
    setShowChormePicker(!showChormePicker)
  }

  const [currentMetadata, setCurrentMetadata] = useState({ key: '', value: '' })

  const organizationSchema = organizationFormSchema
  const organizationForm = useForm<z.infer<typeof organizationSchema>>({
    resolver: zodResolver(organizationSchema),
    defaultValues: organizations
  })

  const [isCollapseMetadataOpen, setIsCollapseMetadataOpen] =
    React.useState(false)

  const [hasMetadata, setHasMetadata] = useState(() => {
    return (
      organizations &&
      organizations.metadata &&
      Object.keys(organizations.metadata).length > 0
    )
  })

  const [metadataList, setMetadataList] = useState<Record<string, string>>(
    organizations?.metadata || {}
  )

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
    e.preventDefault()

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

  const handlerCollapseMetadata = () => {
    setIsCollapseMetadataOpen(!isCollapseMetadataOpen)
  }

  const renderMetadata = () => {
    return (
      <div className="flex w-full flex-col ">
        <div className="mt-2 flex w-full flex-col ">
          <div className="flex gap-5">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="key">Chave</Label>
                <Input
                  id="key"
                  value={currentMetadata.key}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleMetadataChange(e, 'key')
                  }
                  placeholder="Key"
                  className="h-9 items-center justify-between"
                />
              </div>

              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  value={currentMetadata.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleMetadataChange(e, 'value')
                  }
                  placeholder="Value"
                  className="h-9"
                />
              </div>
            </div>

            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handlerAddMetadata(e)
              }
              className="h-9 w-9 self-end rounded-full bg-shadcn-600 disabled:bg-shadcn-200"
              disabled={!currentMetadata.key || !currentMetadata.value}
            >
              <Plus
                size={16}
                className={cn(
                  'shrink-0',
                  !currentMetadata.key || !currentMetadata.value
                    ? 'text-shadcn-400'
                    : 'text-white'
                )}
              />
            </Button>
          </div>
        </div>
        <div>
          {Object.entries(metadataList).map(([key, value], index) => (
            <div key={key} className="mt-2 flex items-center justify-between">
              <div className="flex w-full gap-5">
                <div className="flex flex-1 gap-2">
                  <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
                    {key}
                  </div>
                  <div className="flex h-9 flex-1 items-center rounded-md bg-shadcn-100 px-2">
                    {value}
                  </div>
                </div>
                <Button
                  onClick={() => handlerRemoveMetadata(key)}
                  className="group h-9 w-9 rounded-full border border-shadcn-200 bg-white hover:border-none"
                >
                  <Trash
                    size={16}
                    className="shrink-0 text-black group-hover:text-white"
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Form {...organizationForm}>
        <div className="mb-16 flex gap-6">
          <div className="grow">
            <Card className="rounded-lg bg-white shadow">
              <CardHeader>
                <div className="text-sm font-medium text-zinc-400">
                  {description}
                </div>
              </CardHeader>

              <CardContent className="border-t border-zinc-300">
                <div className="mt-6 grid grid-cols-2 gap-5">
                  <FormField
                    control={organizationForm.control}
                    name="doingBusinessAs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-zinc-600">
                          Trade Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={organizationForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-zinc-600">
                          Legal Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
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
                          Document
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardContent className="border-t border-zinc-300">
                <div className="mt-6 grid grid-cols-2 gap-5">
                  <FormField
                    control={organizationForm.control}
                    name="address.line1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-zinc-600">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
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
                          Complement
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite..."
                            {...field}
                            value={organizations?.address.line2}
                          />
                        </FormControl>
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
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={organizationForm.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-zinc-600">
                          State
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
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
                          City
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
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
                          Zip Code
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>

              <CardContent className="border-t border-zinc-300">
                <div className="mt-6 grid grid-cols-2 gap-5">
                  <FormField
                    control={organizationForm.control}
                    name="parentOrganizationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-zinc-600">
                          Parent Organization
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Digite..." />
                        </FormControl>
                        <p className="text-xs font-medium text-zinc-400">
                          {t('informationText.parentOrganizationText')}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-16 pt-6 shadow">
              <CardContent className="w-full">
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
                      {!isCollapseMetadataOpen ? (
                        <ChevronDown
                          onClick={() => {
                            handlerCollapseMetadata()
                          }}
                          color="#3F3F46"
                        />
                      ) : (
                        <ChevronUp
                          onClick={() => {
                            handlerCollapseMetadata()
                          }}
                          color="#3F3F46"
                        />
                      )}
                    </div>
                  </div>

                  {isCollapseMetadataOpen && (
                    <div className="mt-6 w-full border-t">
                      <div>
                        <div className="flex w-full">
                          <Collapsible
                            className="flex w-full"
                            open={isCollapseMetadataOpen}
                            asChild
                          >
                            {
                              <div className="mt-6 flex w-full items-center justify-between">
                                {renderMetadata()}
                              </div>
                            }
                          </Collapsible>
                        </div>
                      </div>
                    </div>
                  )}

                  <FormMessage />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grow">
            <Card className="w-full shadow">
              <CardHeader>Avatar</CardHeader>
              <CardContent className="flex w-full justify-center pb-0 ">
                <div className="flex">
                  <Avatar className="flex h-44 w-44 items-center justify-center rounded-[30px] border border-zinc-300 bg-zinc-200 shadow">
                    <AvatarImage className="h-44 w-44" src="" alt="@shadcn" />
                    <AvatarFallback className="flex h-10 w-10 gap-2 rounded-full border border-zinc-200 bg-white p-2 shadow">
                      <Camera className="relative h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex items-center justify-center">
                <Button className="gap-2 rounded-md border border-zinc-300 bg-white text-zinc-600 shadow hover:bg-none">
                  Remove
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6 shadow">
              <CardHeader>
                <p className="text-sm font-medium text-zinc-600">
                  Cor de acento
                </p>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="inline-flex h-10 w-[180px] items-start justify-start gap-2 rounded-lg">
                    <div
                      className="h-9 w-9 rounded-md border border-zinc-300"
                      style={{ backgroundColor: colorSelected }}
                      onClick={handleColorPicker}
                    />
                    <div
                      className="flex h-9 shrink grow basis-0 items-center justify-start rounded-md border border-zinc-300 px-2"
                      onClick={handleColorPicker}
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
                </div>
                {showChormePicker && (
                  <div>
                    <ChromePicker
                      color={colorSelected}
                      className="absolute"
                      disableAlpha={true}
                      onChangeComplete={onColorPickerInfoChange}
                      onChange={onColorPickerInfoChange}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card className="fixed bottom-0 inline-flex w-full items-center justify-end gap-6 self-baseline rounded-none">
            <div className="mr-10 flex items-center justify-end gap-6">
              <Button
                className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm shadow"
                variant="outline"
                size="default"
              >
                Cancel
              </Button>
              <Button
                className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-zinc-800 px-4 py-2 text-sm text-white shadow"
                variant="outline"
                size="default"
              >
                Criar Organização
              </Button>
            </div>
          </Card>
        </div>
      </Form>
    </div>
  )
}

export default OrganizationsView
