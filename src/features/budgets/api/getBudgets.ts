import apiClient from '../../../lib/api/client'

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

export const getBudgets = async (): Promise<BudgetListResponse> => {
  const response = await apiClient.get<BudgetListResponse>('/budgets')
  return response.data
}
