import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage(): React.JSX.Element {
  return (
    <section className="max-w-[720px]">
      <h1 className="text-[28px] font-semibold">分析表示</h1>
      <p className="mt-[8px] text-[14px] text-primary-text/80">
        月次推移やカテゴリ別の集計グラフをこのページに実装していきます。
      </p>
    </section>
  )
}
