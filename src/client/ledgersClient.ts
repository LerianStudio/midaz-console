import axiosInstance from '@/utils/axios/config'

export const fetchLedgers = async () => {
  try {
    const response = await axiosInstance.get('/ledgers')
    return response.data
  } catch (error) {
    throw error
  }
}

export const ledgerDetail = async (name: string) => {
  try {
    const response = await axiosInstance.get(`/ledgers/${name}`)
    return response.data
  } catch (error) {
    throw error
  }
}
