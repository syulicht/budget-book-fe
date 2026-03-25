import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from 'react-oidc-context'

import { queryClient } from './lib/api/queryClient'
import { onSigninCallback } from './lib/auth/config'
import { userManager } from './lib/auth/userManager'
import { router } from './lib/router'

import './index.css'

createRoot(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  document.getElementById('root')!
).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider onSigninCallback={onSigninCallback} userManager={userManager}>
        <RouterProvider context={{ queryClient }} router={router} />
      </AuthProvider>
      {import.meta.env.DEV ? <ReactQueryDevtools initialIsOpen={false} /> : null}
    </QueryClientProvider>
  </StrictMode>
)
