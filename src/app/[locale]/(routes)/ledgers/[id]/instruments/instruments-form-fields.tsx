export const getInstrumentsFormFields = (t: any) => {
  return [
    {
      name: 'name',
      label: 'tipo',
      placeholder: '',
      isRequired: true,
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' }
      ]
    },
    {
      name: 'name',
      label: t('formFields.name.name'),
      placeholder: '',
      isRequired: true
    },
    {
      name: 'code',
      label: t('formFields.code.name'),
      placeholder: '',
      isRequired: true
    }
  ]
}
