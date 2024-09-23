export const getLedgersFormFields = (t: any) => {
  return [
    {
      name: 'name',
      label: t('formFields.name.name'),
      placeholder: t('formFields.name.placeholder'),
      isRequired: true
    }
  ]
}