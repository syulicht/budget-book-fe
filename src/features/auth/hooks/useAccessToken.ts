import { useCallback } from 'react'
import { useAuth } from 'react-oidc-context'

export interface UseAccessTokenResult {
  getAccessToken: () => Promise<string | null>
}

export const useAccessToken = (): UseAccessTokenResult => {
  const auth = useAuth()

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    const existingToken = auth.user?.access_token
    const hasValidToken = Boolean(existingToken && !auth.user?.expired)
    if (hasValidToken) {
      return existingToken ?? null
    }

    try {
      const renewedUser = await auth.signinSilent()
      return renewedUser?.access_token ?? null
    } catch (error) {
      console.error('Failed to renew access token silently', error)
    }

    if (auth.activeNavigator !== 'signinRedirect') {
      await auth.signinRedirect()
    }

    return null
  }, [auth])

  return { getAccessToken }
}
