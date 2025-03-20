import { getStorage } from './get-storage'

export function getStorageObject(key: string, defaultValue: any) {
  try {
    const dataString = getStorage(key, defaultValue)
    const isEmpty = Object.keys(dataString).length === 0

    return isEmpty ? {} : JSON.parse(dataString)
  } catch (error) {
    console.error(error)
    return defaultValue
  }
}
