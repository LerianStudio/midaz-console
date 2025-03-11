import { getStorage } from './get-storage'

export function getStorageObject(key: string, defaultValue: any) {
  try {
    const dataString = getStorage(key, defaultValue)
    return JSON.parse(dataString)
  } catch (error) {
    console.error(error)
    return defaultValue
  }
}
