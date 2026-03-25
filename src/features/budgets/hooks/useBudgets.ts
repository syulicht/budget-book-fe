import { queryOptions, useQuery } from '@tanstack/react-query'

import { getBudgets } from '@/features/budgets/api/getBudgets'

export const budgetQueryKeys = {
  all: ['budgets'] as const,
  list: () => [...budgetQueryKeys.all, 'list'] as const,
}

export const budgetsQueryOptions = () =>
  queryOptions({
    queryKey: budgetQueryKeys.list(),
    queryFn: getBudgets,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

export interface UseBudgetsOptions {
  enabled?: boolean
}

export const useBudgets = (options?: UseBudgetsOptions) => {
  return useQuery({
    ...budgetsQueryOptions(),
    enabled: options?.enabled,
  })
}
