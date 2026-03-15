import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { useAuth } from 'react-oidc-context'

export const Route = createFileRoute('/callback')({
  component: CallbackPage,
})

function CallbackPage(): React.JSX.Element {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isLoading) {
      return
    }

    if (auth.isAuthenticated) {
      void navigate({ to: '/dashboard', replace: true })
      return
    }

    if (auth.activeNavigator !== 'signinRedirect') {
      void auth.signinRedirect()
    }
  }, [auth, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[24px]">
      <LoaderCircle className="h-[28px] w-[28px] animate-spin text-primary-text" />
    </div>
  )
}
