import axios, { AxiosError, AxiosHeaders } from 'axios'

import { userManager } from '../auth/userManager'

type RetriableRequestConfig = {
  _retry?: boolean
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
})

const getValidAccessToken = async (): Promise<string | null> => {
  const currentUser = await userManager.getUser()
  if (currentUser?.access_token && !currentUser.expired) {
    return currentUser.access_token
  }

  try {
    const renewedUser = await userManager.signinSilent()
    return renewedUser?.access_token ?? null
  } catch (error) {
    console.error('Failed to renew access token silently', error)
    return null
  }
}

apiClient.interceptors.request.use(async (config) => {
  const accessToken = await getValidAccessToken()
  if (!accessToken) {
    return config
  }

  const headers = AxiosHeaders.from(config.headers)
  headers.set('Authorization', `Bearer ${accessToken}`)
  config.headers = headers

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config
    if (!originalRequest) {
      throw error
    }

    const retriableRequest = originalRequest as typeof originalRequest & RetriableRequestConfig
    const shouldRetry = error.response?.status === 401 && retriableRequest._retry !== true
    if (!shouldRetry) {
      throw error
    }

    retriableRequest._retry = true

    try {
      const renewedUser = await userManager.signinSilent()
      const renewedAccessToken = renewedUser?.access_token
      if (!renewedAccessToken) {
        await userManager.signinRedirect()
        throw error
      }

      const headers = AxiosHeaders.from(retriableRequest.headers)
      headers.set('Authorization', `Bearer ${renewedAccessToken}`)
      retriableRequest.headers = headers

      return await apiClient(retriableRequest)
    } catch (renewError) {
      console.error('Failed to retry API request after 401', renewError)

      await userManager.signinRedirect()
      throw error
    }
  }
)

export default apiClient
