export const truncateString = (str: any, num: any) => {
  if (str.length <= num) {
    return str
  }

  return str.slice(0, num) + '...'
}
