import type { BudgetListResponse } from '@/types/budget'

import apiClient from '@/lib/api/client'

export const getBudgets = async (): Promise<BudgetListResponse> => {
  const response = await apiClient.get<BudgetListResponse>('/budgets')
  return response.data
}
