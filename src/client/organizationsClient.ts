import axiosInstance from '@/utils/axios/config'

export const fetchOrganization = async () => {
  try {
    const response = await axiosInstance.get('/organizations')
    return response.data
  } catch (error) {
    throw error
  }
}
