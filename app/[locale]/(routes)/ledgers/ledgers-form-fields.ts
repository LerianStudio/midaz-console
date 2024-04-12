export function getLedgersFormFields(t: any) {
  return [
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'name',
      label: t('formFields.name.name'),
      placeholder: t('formFields.name.placeholder')
    },
    {
      name: 'divisionName',
      label: t('formFields.divisionName.name'),
      placeholder: t('formFields.divisionName.placeholder')
    },
    {
      name: 'defaultTimezone',
      label: t('formFields.defaultTimezone.name'),
      placeholder: t('formFields.defaultTimezone.name')
    },
    {
      name: 'defaultCurrency',
      label: t('formFields.defaultCurrency.name'),
      placeholder: t('formFields.defaultCurrency.placeholder')
    }
  ]
}
