import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings')({
  component: SettingsPage,
})

function SettingsPage(): React.JSX.Element {
  return (
    <section className="max-w-[720px]">
      <h1 className="text-[28px] font-semibold">設定</h1>
      <p className="mt-[8px] text-[14px] text-primary-text/80">
        アプリ全体の設定やユーザー設定をこのページに実装していきます。
      </p>
    </section>
  )
}
