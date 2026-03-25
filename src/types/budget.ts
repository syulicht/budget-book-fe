export interface BudgetListItem {
  id: number
  date: string
  category: {
    id: number
    name: string
  }
  amount: number
  memo: string
}

export interface BudgetListResponse {
  budgets: BudgetListItem[]
}
