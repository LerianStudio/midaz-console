export const truncateString = (str: any, num: any) => {
  if (str.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
