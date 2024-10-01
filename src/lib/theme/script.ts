/**
 * Script that runs before DOM mounting to apply changes on client side
 * @param accentColor
 */
export const script = (accentColor: string) => {
  document.documentElement.style.setProperty('--accent', accentColor)
}
