import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'

import App from './App.tsx'
import { onSigninCallback } from './lib/auth/config'
import { userManager } from './lib/auth/userManager'

import './index.css'

createRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!
).render(
  <StrictMode>
    <AuthProvider onSigninCallback={onSigninCallback} userManager={userManager}>
      <App />
    </AuthProvider>
  </StrictMode>
)
