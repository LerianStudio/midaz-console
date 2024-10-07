export const getPortfoliosFormField = (t: any) => {
  return [
    {
      name: 'portfolio_name',
      label: "Nome do portfólio",
      isRequired: true
    },
    {
      name: 'entity_id',
      label: 'ID da Entidade',
      isRequired: true
    }
  ]
}