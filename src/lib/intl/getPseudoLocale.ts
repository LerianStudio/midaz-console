export default function getPseudoLocale(
  locale: string,
  defaultLocale: string
): string {
  return locale ? locale.split('-')[0] : defaultLocale.split('-')[0]
}
