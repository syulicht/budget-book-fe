import { WebStorageStateStore } from 'oidc-client-ts'

import type { UserManagerSettings } from 'oidc-client-ts'

const redirectUri = import.meta.env.VITE_REDIRECT_URI

const silentRedirectUri = import.meta.env.VITE_SILENT_REDIRECT_URI

export const cognitoAuthSettings: UserManagerSettings = {
  authority: `https://cognito-idp.${
    import.meta.env.VITE_AWS_REGION
  }.amazonaws.com/${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
  client_id: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
  redirect_uri: redirectUri,
  post_logout_redirect_uri: import.meta.env.VITE_LOGOUT_URI,
  response_type: 'code',
  scope: 'openid email',
  automaticSilentRenew: true,
  silent_redirect_uri: silentRedirectUri,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
}

export const onSigninCallback = (): void => {
  window.history.replaceState({}, document.title, window.location.pathname)
}
