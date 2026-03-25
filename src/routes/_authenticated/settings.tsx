import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
})

function SettingsPage(): React.JSX.Element {
  return <section className="max-w-[720px]" />
}
