import { withCategoryPresentation } from "./categoryPresentation.js";

export const EMPTY_DASHBOARD_SUMMARY = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  savingsRate: 0,
  transactionCounts: {
    income: 0,
    expense: 0,
  },
  budgetLimit: 0,
  budgetSpent: 0,
  budgetRemaining: 0,
  budgetPercentUsed: 0,
  topCategory: null,
  spendingByCategory: [],
  budgets: [],
  recentTransactions: [],
};

export function normalizeDashboardSummary(data = {}) {
  const spendingByCategory = (data.spendingByCategory || []).map((category) => ({
    ...category,
    ...withCategoryPresentation({
      id: category.categoryId,
      name: category.name,
      type: category.type,
    }),
  }));

  const budgets = (data.budgets || []).map((budget) => ({
    ...budget,
    category: withCategoryPresentation({
      id: budget.categoryId,
      name: budget.categoryName,
      type: budget.categoryType,
    }),
  }));

  const recentTransactions = (data.recentTransactions || []).map((transaction) => ({
    ...transaction,
    category: withCategoryPresentation({
      id: transaction.categoryId,
      name: transaction.categoryName,
      type: transaction.categoryType,
    }),
  }));

  return {
    ...EMPTY_DASHBOARD_SUMMARY,
    ...data,
    transactionCounts: {
      ...EMPTY_DASHBOARD_SUMMARY.transactionCounts,
      ...data.transactionCounts,
    },
    topCategory: spendingByCategory[0] || null,
    spendingByCategory,
    budgets,
    recentTransactions,
  };
}
