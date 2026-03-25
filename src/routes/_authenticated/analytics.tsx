import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage(): React.JSX.Element {
  return <section className="max-w-[720px]" />
}
