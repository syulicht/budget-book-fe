import { Navigate, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage(): React.JSX.Element {
  return <Navigate to="/dashboard" />
}
