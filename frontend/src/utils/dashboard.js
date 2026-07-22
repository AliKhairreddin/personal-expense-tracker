const currencyFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
});

export function formatCurrency(value) {
  return currencyFormatter.format(toNumber(value));
}

export function buildDashboardSummary(
  transactions = [],
  budgets = [],
  getCategoryById = () => ({ name: "Uncategorized", icon: "•", color: "#94a3b8" }),
) {
  const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
  const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");

  const totalIncome = sumAmounts(incomeTransactions);
  const totalExpense = sumAmounts(expenseTransactions);
  const balance = totalIncome - totalExpense;

  const categoryTotals = new Map();
  expenseTransactions.forEach((transaction) => {
    const categoryId = Number(transaction.categoryId);
    categoryTotals.set(categoryId, (categoryTotals.get(categoryId) ?? 0) + toNumber(transaction.amount));
  });

  const spendingByCategory = [...categoryTotals.entries()]
    .map(([categoryId, amount]) => {
      const category = getCategoryById(categoryId);
      return {
        categoryId,
        amount,
        name: category.name,
        icon: category.icon,
        color: category.color,
        percentOfExpenses: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
      };
    })
    .sort((left, right) => right.amount - left.amount);

  const budgetLimit = budgets.reduce((sum, budget) => sum + toNumber(budget.limit), 0);
  const budgetSpent = budgets.reduce((sum, budget) => {
    if (Number.isFinite(Number(budget.spent))) return sum + toNumber(budget.spent);

    const categorySpent = expenseTransactions
      .filter((transaction) => Number(transaction.categoryId) === Number(budget.categoryId))
      .reduce((subtotal, transaction) => subtotal + toNumber(transaction.amount), 0);
    return sum + categorySpent;
  }, 0);

  const recentTransactions = [...transactions]
    .sort((left, right) => {
      const dateDifference = String(right.date).localeCompare(String(left.date));
      return dateDifference || toNumber(right.id) - toNumber(left.id);
    })
    .slice(0, 5);

  return {
    totalIncome,
    totalExpense,
    balance,
    savingsRate: totalIncome > 0 ? (balance / totalIncome) * 100 : 0,
    budgetLimit,
    budgetSpent,
    budgetRemaining: budgetLimit - budgetSpent,
    budgetPercentUsed: budgetLimit > 0 ? (budgetSpent / budgetLimit) * 100 : 0,
    topCategory: spendingByCategory[0] ?? null,
    spendingByCategory,
    recentTransactions,
  };
}

function sumAmounts(items) {
  return items.reduce((sum, item) => sum + toNumber(item.amount), 0);
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}
