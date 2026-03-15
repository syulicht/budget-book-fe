import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/budgets')({
  component: BudgetsPage,
})

function BudgetsPage(): React.JSX.Element {
  return (
    <section className="max-w-[720px]">
      <h1 className="text-[28px] font-semibold">予算管理</h1>
      <p className="mt-[8px] text-[14px] text-primary-text/80">
        予算一覧や登録フォームをこのページに実装していきます。
      </p>
    </section>
  )
}
