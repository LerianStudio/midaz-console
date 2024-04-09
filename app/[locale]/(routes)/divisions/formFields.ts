export const createFormFields = (t: any) => [
  {
    name: 'id',
    label: 'ID'
  },
  {
    name: 'legalName',
    label: t('formFields.legalName.name'),
    placeholder: t('formFields.legalName.placeholder')
  },
  {
    name: 'doingBusinessAs',
    label: t('formFields.doingBusinessAs.name'),
    placeholder: t('formFields.doingBusinessAs.placeholder')
  },
  {
    name: 'legalDocument',
    label: t('formFields.legalDocument.name'),
    placeholder: t('formFields.legalDocument.placeholder')
  },
  {
    name: 'address.line1',
    label: t('formFields.address.name'),
    placeholder: t('formFields.address.placeholder')
  },
  {
    name: 'address.line2',
    label: t('formFields.address2.name'),
    placeholder: t('formFields.address2.placeholder')
  },
  {
    name: 'address.country',
    label: t('formFields.country.name'),
    placeholder: t('formFields.country.placeholder')
  },
  {
    name: 'address.state',
    label: t('formFields.state.name'),
    placeholder: t('formFields.state.placeholder')
  },
  {
    name: 'address.city',
    label: t('formFields.city.name'),
    placeholder: t('formFields.city.placeholder')
  },
  {
    name: 'address.zipCode',
    label: t('formFields.zipCode.name'),
    placeholder: t('formFields.zipCode.placeholder')
  },
  {
    name: 'defaultTimezone',
    label: t('formFields.defaultTimezone.name'),
    placeholder: t('formFields.defaultTimezone.placeholder')
  },
  {
    name: 'defaultCurrency',
    label: t('formFields.defaultCurrency.name'),
    placeholder: t('formFields.defaultCurrency.placeholder')
  }
]
