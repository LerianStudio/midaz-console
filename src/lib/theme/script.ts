/**
 * Script that runs before DOM mounting to apply changes on client side
 * @param accentColor
 */
export const script = (accentColor: string, accentForegroundColor: string) => {
  document.documentElement.style.setProperty('--accent', accentColor)
  document.documentElement.style.setProperty(
    '--accent-foreground',
    accentForegroundColor
  )
}
