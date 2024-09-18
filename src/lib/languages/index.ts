const languages = [
  {
    name: 'English',
    locale: 'en-US',
    localizedName: {
      id: 'language.english',
      defaultMessage: 'English'
    }
  },
  {
    name: 'Português',
    locale: 'pt-BR',
    localizedName: {
      id: 'language.portuguese',
      defaultMessage: 'Portuguese'
    }
  }
]

export type Language = typeof languages extends readonly (infer ElementType)[]
  ? ElementType
  : never

export default languages
