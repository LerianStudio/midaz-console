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


export const getPortfoliosFormField = (t: any) => {
  return [
    {
      name: 'name',
      label: t('formFields.name.name'),
      placeholder: t('formFields.name.placeholder'),
      isRequired: true
    },
    {
      name: 'entity_id',
      label: 'ID da entidade',
      placeholder: t('formFields.name.placeholder'),
      isRequired: true
    }
  ]
}