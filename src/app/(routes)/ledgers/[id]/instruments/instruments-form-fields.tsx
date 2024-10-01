/**
 * TODO: This never had translations into the json file
 * @param t
 * @returns
 */

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
      label: 'formFields.name.name',
      placeholder: '',
      isRequired: true
    },
    {
      name: 'code',
      label: 'formFields.code.name',
      placeholder: '',
      isRequired: true
    }
  ]
}
