'use client'

import type { OrganizationsType } from '@/types/organizations-type'
import { Card } from '@/components/card'
import { Separator } from '@/components/ui/separator'
import { CardContent, CardFooter } from '@/components/ui/card/card'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { organizationFormSchema } from '@/app/[locale]/(routes)/settings/organizations/organizations-form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button/button'
import {
  RenderCountryField,
  RenderField,
  RenderParentIdField,
  RenderStateField
} from '@/components/sheet/fields/render-field'
import React, { useState } from 'react'
import MetadataInput from '@/components/metadata/metadata-input'
import MetadataPreview from '@/components/metadata/metadata-preview'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { Camera, ChevronDown, ChevronUp, HashIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar/avatar'
import { Input } from '@/components/ui/input/input'
import { ChromePicker } from 'react-color'
import { useRouter } from 'next/navigation'
import { useParentOrganizations } from '@/utils/queries'
import { useIntl } from 'react-intl'

type OrganizationsViewProps = {
  organizations?: OrganizationsType
  onSubmit: (values: OrganizationsType) => void
}

type OrganizationFormData = z.infer<typeof organizationFormSchema>

const OrganizationsView = ({
  organizations,
  onSubmit
}: OrganizationsViewProps) => {
  const intl = useIntl()
  const router = useRouter()
  const [showMetadataCollapse, setShowMetadataCollapse] = useState(false)
  const [showInputAvatarDialog, setShowInputAvatarDialog] = useState(false)
  const [avatarURL, setAvatarURL] = useState('')
  const [showChormePicker, setShowChormePicker] = useState(false)
  const isNewOrganization = !organizations
  const parentOrganizations = useParentOrganizations()

  const organizationForm = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationFormSchema),
    values: organizations
  })

  const handleOrganizationsSubmit = (values: OrganizationFormData) => {
    onSubmit(values)
  }

  const handleAddMetadata = (data: { key: string; value: string }) => {
    const metadataList = organizationForm.getValues('metadata')
    organizationForm.setValue('metadata', {
      ...metadataList,
      [data.key]: data.value
    })
  }

  const handlerRemoveMetadata = async (key: string) => {
    const metadataList = organizationForm.getValues('metadata')
    const newMetadata = { ...metadataList }
    delete newMetadata[key]

    organizationForm.setValue('metadata', newMetadata)
  }

  return (
    <div>
      <Form {...organizationForm}>
        <form
          onSubmit={organizationForm.handleSubmit(handleOrganizationsSubmit)}
        >
          <div className="mb-16 flex gap-6">
            <div className="grow space-y-6">
              <Card.Root className="gap-0 space-x-0 space-y-0 p-0 shadow">
                <Card.Header
                  title={
                    isNewOrganization
                      ? intl.formatMessage({
                          id: 'organizations.organizationView.newOrganization.description',
                          defaultMessage:
                            'Fill in the details of the Organization you wish to create.'
                        })
                      : intl.formatMessage({
                          id: 'organizations.organizationView.editOrganization.description',
                          defaultMessage:
                            'View and edit the Organization fields.'
                        })
                  }
                  className="space-x-0 space-y-0 p-6 text-sm font-medium normal-case text-zinc-400"
                />
                <Separator />

                <CardContent className="grid grid-cols-2 gap-5 p-6">
                  {!isNewOrganization && (
                    <RenderField
                      field={{
                        name: 'id',
                        label: intl.formatMessage({
                          id: 'organizations.organizationView.formFields.id',
                          defaultMessage: 'Organization ID'
                        }),
                        placeholder: intl.formatMessage({
                          id: 'common.typePlaceholder',
                          defaultMessage: 'Type...'
                        })
                      }}
                      isDisabled={true}
                      form={organizationForm}
                    />
                  )}

                  <RenderField
                    field={{
                      name: 'legalName',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.legalName',
                        defaultMessage: 'Legal Name'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderField
                    field={{
                      name: 'doingBusinessAs',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.doingBusinessAs',
                        defaultMessage: 'Trade Name'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderField
                    field={{
                      name: 'legalDocument',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.legalDocument',
                        defaultMessage: 'Document'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />
                </CardContent>

                <Separator />

                <CardContent className="grid grid-cols-2 gap-5 p-6">
                  <RenderField
                    field={{
                      name: 'address.line1',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.address',
                        defaultMessage: 'Address'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderField
                    field={{
                      name: 'address.line2',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.complement',
                        defaultMessage: 'Complement'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderCountryField
                    field={{
                      name: 'address.country',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.country',
                        defaultMessage: 'Country'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.selectPlaceholder',
                        defaultMessage: 'Select...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderStateField
                    field={{
                      name: 'address.state',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.state',
                        defaultMessage: 'State'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.selectPlaceholder',
                        defaultMessage: 'Select...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderField
                    field={{
                      name: 'address.city',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.city',
                        defaultMessage: 'City'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderField
                    field={{
                      name: 'address.neighborhood',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.neighborhood',
                        defaultMessage: 'Neighborhood'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />

                  <RenderField
                    field={{
                      name: 'address.zipCode',
                      label: intl.formatMessage({
                        id: 'organizations.organizationView.formFields.zipCode',
                        defaultMessage: 'ZIP Code'
                      }),
                      placeholder: intl.formatMessage({
                        id: 'common.typePlaceholder',
                        defaultMessage: 'Type...'
                      })
                    }}
                    form={organizationForm}
                  />
                </CardContent>

                <Separator />

                <CardContent className="grid grid-cols-2 gap-5 p-6">
                  {!isNewOrganization && (
                    <RenderField
                      field={{
                        name: 'parentOrganizationId',
                        label: intl.formatMessage({
                          id: 'organizations.organizationView.formFields.parentOrganization',
                          defaultMessage: 'Parent Organization'
                        }),
                        placeholder: intl.formatMessage({
                          id: 'organizations.organizationView.notApplicable',
                          defaultMessage: 'N/A'
                        })
                      }}
                      isDisabled={true}
                      form={organizationForm}
                    />
                  )}

                  {isNewOrganization && !parentOrganizations.isLoading && (
                    <RenderParentIdField
                      field={{
                        name: 'parentOrganizationId',
                        label: intl.formatMessage({
                          id: 'organizations.organizationView.formFields.parentOrganization',
                          defaultMessage: 'Parent Organization'
                        }),
                        placeholder: intl.formatMessage({
                          id: 'common.selectPlaceholder',
                          defaultMessage: 'Select...'
                        }),
                        description: intl.formatMessage({
                          id: 'organizations.organizationView.informationText.parentOrganizationText',
                          defaultMessage:
                            'Select if your Organization is affiliated with another'
                        }),
                        options:
                          parentOrganizations.data.length > 0
                            ? parentOrganizations.data
                            : []
                      }}
                      isDisabled={
                        parentOrganizations.data.length === 0 ||
                        !isNewOrganization
                      }
                      form={organizationForm}
                    />
                  )}
                </CardContent>
              </Card.Root>

              <Card.Root className="p-0 shadow">
                <Collapsible
                  open={showMetadataCollapse}
                  onOpenChange={setShowMetadataCollapse}
                >
                  <CardContent>
                    <div className="flex items-center justify-between pt-6">
                      <div className="">
                        <Card.Header
                          className="text-lg font-medium normal-case text-zinc-600"
                          title="Metadata"
                        />

                        <p className="self-stretch text-xs font-normal italic text-zinc-400">
                          {intl.formatMessage(
                            {
                              id: 'organizations.organizationView.informationText.metadataRegisterCountText',
                              defaultMessage: '{registerCount} added records'
                            },
                            {
                              registerCount: Object.entries(
                                organizationForm.getValues('metadata') || 0
                              ).length
                            }
                          )}
                        </p>
                      </div>

                      <CollapsibleTrigger
                        className="content-end justify-end"
                        asChild
                      >
                        <button className="inline-flex h-[25px] w-[25px] items-center justify-center rounded-full border-none ">
                          {showMetadataCollapse ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </button>
                      </CollapsibleTrigger>
                    </div>
                  </CardContent>

                  <CollapsibleContent>
                    <Separator />

                    <CardContent className="pt-6">
                      <React.Fragment>
                        <MetadataInput handleAddMetadata={handleAddMetadata} />
                        <MetadataPreview
                          metaFields={organizationForm.watch('metadata')}
                          handleRemoveMetadata={handlerRemoveMetadata}
                        />
                      </React.Fragment>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card.Root>
            </div>

            <div className="grow space-y-6">
              <Card.Root className="p-6 shadow">
                <Card.Header
                  className="text-md w-full font-medium normal-case text-zinc-600"
                  title={intl.formatMessage({
                    id: 'organizations.organizationView.formFields.avatar',
                    defaultMessage: 'Avatar'
                  })}
                />

                <CardContent className="mb-4 self-center pb-0">
                  <Dialog
                    open={showInputAvatarDialog}
                    onOpenChange={setShowInputAvatarDialog}
                  >
                    <DialogTrigger
                      className="gap-2"
                      onClick={() => setShowInputAvatarDialog(true)}
                    >
                      <Avatar className="flex h-44 w-44 items-center justify-center rounded-[30px] border border-zinc-300 bg-zinc-200 shadow">
                        <AvatarImage
                          className="h-44 w-44 items-center justify-center  gap-2 rounded-[30px] border border-zinc-200 shadow"
                          src={organizationForm.getValues('organizationAvatar')}
                          alt="Organization Avatar"
                        />
                        <AvatarFallback className="flex h-10 w-10 gap-2 rounded-full border border-zinc-200 bg-white p-2 shadow">
                          <Camera className="relative h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogTitle className="flex w-full items-center justify-center">
                        {intl.formatMessage({
                          id: 'organizations.organizationView.avatarDialog.title',
                          defaultMessage: 'Avatar'
                        })}
                      </DialogTitle>
                      <DialogDescription className="flex w-full items-center justify-center">
                        {intl.formatMessage({
                          id: 'organizations.organizationView.avatarDialog.description',
                          defaultMessage: 'Insert your SVG or PNG image URL.'
                        })}
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
                            'organizationAvatar',
                            avatarURL
                          )
                          setShowInputAvatarDialog(false)
                        }}
                      >
                        {intl.formatMessage({
                          id: 'organizations.organizationView.avatarDialog.button',
                          defaultMessage: 'Send'
                        })}
                      </Button>
                    </DialogContent>
                  </Dialog>
                </CardContent>

                {organizationForm.getValues('organizationAvatar') === '' ||
                organizationForm.getValues('organizationAvatar') ===
                  undefined ? (
                  <div className="w-fit justify-start whitespace-pre-wrap text-xs font-medium text-zinc-400">
                    <p>
                      {intl.formatMessage({
                        id: 'organizations.organizationView.informationText.avatarInformationText',
                        defaultMessage:
                          'Organization Symbol, which will be applied in the UI. \nFormat: SVG or PNG, 512x512 px.'
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="flex w-full content-center items-center justify-center self-center">
                    <Button
                      className="justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm shadow"
                      variant="outline"
                      size="default"
                      onClick={() => {
                        setAvatarURL('')
                        organizationForm.setValue('organizationAvatar', '')
                      }}
                    >
                      {intl.formatMessage({
                        id: 'organizations.organizationView.remove',
                        defaultMessage: 'Remove'
                      })}
                    </Button>
                  </div>
                )}
              </Card.Root>

              <Card.Root className="p-6 shadow ">
                <Card.Header
                  className="text-sm font-medium text-zinc-600"
                  title={intl.formatMessage({
                    id: 'organizations.organizationView.formFields.accentColor',
                    defaultMessage: 'Accent Color'
                  })}
                />

                <CardContent className="inline-flex h-10 w-[180px] items-start justify-start gap-2 rounded-lg p-0">
                  <div
                    className="h-9 w-9 rounded-md border border-zinc-300"
                    style={{
                      backgroundColor:
                        organizationForm.getValues(
                          'organizationAccentColor'
                        ) !== ''
                          ? organizationForm.getValues(
                              'organizationAccentColor'
                            )
                          : '#FFFFFF'
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
                          {organizationForm
                            .getValues('organizationAccentColor')
                            ?.split('#')}
                        </div>
                      </div>
                    </div>
                    <div className="flex h-[38px] shrink grow basis-0 items-center justify-start px-1.5 py-2.5" />
                  </div>
                </CardContent>

                {organizationForm.getValues('organizationAccentColor') === '' &&
                  !showChormePicker && (
                    <div className="mt-4 whitespace-pre-wrap text-xs font-medium text-zinc-400">
                      {intl.formatMessage({
                        id: 'organizations.organizationView.informationText.accentColorInformationText',
                        defaultMessage:
                          'Brand color, which will be used specifically in the UI. \nFormat: Hexadecimal/HEX (Ex. #FF0000);'
                      })}
                    </div>
                  )}
                {showChormePicker && (
                  <div>
                    <ChromePicker
                      color={organizationForm.watch('organizationAccentColor')}
                      className="absolute"
                      disableAlpha={true}
                      onChangeComplete={(color) =>
                        organizationForm.setValue(
                          'organizationAccentColor',
                          color.hex
                        )
                      }
                      onChange={(color) =>
                        organizationForm.setValue(
                          'organizationAccentColor',
                          color.hex
                        )
                      }
                    />
                  </div>
                )}
              </Card.Root>
            </div>
          </div>

          <div className="relative h-10 ">
            <CardFooter className="absolute inset-x-0 mb-20 inline-flex items-center justify-end gap-6 self-baseline rounded-none bg-white p-8 shadow">
              <div className="mr-10 flex items-center justify-end gap-6">
                <Button
                  className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white px-4  text-sm shadow"
                  variant="outline"
                  size="default"
                  type="button"
                  onClick={() => {
                    router.back()
                  }}
                >
                  {intl.formatMessage({
                    id: 'organizations.organizationView.cancel',
                    defaultMessage: 'Cancel'
                  })}
                </Button>
                <Button
                  className="flex items-center justify-center gap-2 rounded-md border border-zinc-300 bg-zinc-800 px-4 text-sm text-white shadow"
                  variant="outline"
                  size="default"
                  type="submit"
                >
                  {isNewOrganization
                    ? intl.formatMessage({
                        id: 'organizations.organizationView.newOrganization.button',
                        defaultMessage: 'Create Organization'
                      })
                    : intl.formatMessage({
                        id: 'organizations.organizationView.editOrganization.button',
                        defaultMessage: 'Save'
                      })}
                </Button>
              </div>
            </CardFooter>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default OrganizationsView
