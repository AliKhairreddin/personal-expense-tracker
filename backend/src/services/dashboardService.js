const TOTALS_QUERY = `
  SELECT
    COALESCE(SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
    COALESCE(SUM(CASE WHEN transaction_type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
    SUM(CASE WHEN transaction_type = 'income' THEN 1 ELSE 0 END) AS income_count,
    SUM(CASE WHEN transaction_type = 'expense' THEN 1 ELSE 0 END) AS expense_count
  FROM transactions
  WHERE user_id = ?
`;

const SPENDING_QUERY = `
  SELECT
    categories.category_id,
    categories.category_name,
    categories.category_type,
    SUM(transactions.amount) AS amount
  FROM transactions
  INNER JOIN categories
    ON categories.category_id = transactions.category_id
  WHERE transactions.user_id = ?
    AND transactions.transaction_type = 'expense'
  GROUP BY
    categories.category_id,
    categories.category_name,
    categories.category_type
  ORDER BY amount DESC, categories.category_name ASC
`;

const BUDGETS_QUERY = `
  SELECT
    budgets.budget_id,
    budgets.category_id,
    COALESCE(categories.category_name, 'Overall budget') AS category_name,
    COALESCE(categories.category_type, 'expense') AS category_type,
    budgets.budget_amount,
    DATE_FORMAT(budgets.start_date, '%Y-%m-%d') AS start_date,
    DATE_FORMAT(budgets.end_date, '%Y-%m-%d') AS end_date,
    COALESCE(SUM(transactions.amount), 0) AS spent
  FROM budgets
  LEFT JOIN categories
    ON categories.category_id = budgets.category_id
  LEFT JOIN transactions
    ON transactions.user_id = budgets.user_id
    AND transactions.transaction_type = 'expense'
    AND transactions.transaction_date BETWEEN budgets.start_date AND budgets.end_date
    AND (
      budgets.category_id IS NULL
      OR transactions.category_id = budgets.category_id
    )
  WHERE budgets.user_id = ?
    AND CURDATE() BETWEEN budgets.start_date AND budgets.end_date
  GROUP BY
    budgets.budget_id,
    budgets.category_id,
    categories.category_name,
    categories.category_type,
    budgets.budget_amount,
    budgets.start_date,
    budgets.end_date
  ORDER BY budgets.end_date ASC, budgets.budget_id ASC
`;

const RECENT_TRANSACTIONS_QUERY = `
  SELECT
    transactions.transaction_id,
    transactions.transaction_type,
    transactions.amount,
    transactions.description,
    transactions.category_id,
    categories.category_name,
    categories.category_type,
    DATE_FORMAT(transactions.transaction_date, '%Y-%m-%d') AS transaction_date
  FROM transactions
  INNER JOIN categories
    ON categories.category_id = transactions.category_id
  WHERE transactions.user_id = ?
  ORDER BY
    transactions.transaction_date DESC,
    transactions.transaction_id DESC
  LIMIT 5
`;

async function getDashboardSummary(db, userId) {
  const [
    [totalRows],
    [spendingRows],
    [budgetRows],
    [recentTransactionRows],
  ] = await Promise.all([
    db.query(TOTALS_QUERY, [userId]),
    db.query(SPENDING_QUERY, [userId]),
    db.query(BUDGETS_QUERY, [userId]),
    db.query(RECENT_TRANSACTIONS_QUERY, [userId]),
  ]);

  const totals = totalRows[0] || {};
  const totalIncome = toNumber(totals.total_income);
  const totalExpense = toNumber(totals.total_expense);
  const balance = totalIncome - totalExpense;

  const spendingByCategory = spendingRows.map((row) => {
    const amount = toNumber(row.amount);

    return {
      categoryId: Number(row.category_id),
      name: row.category_name,
      type: row.category_type,
      amount,
      percentOfExpenses: totalExpense > 0 ? (amount / totalExpense) * 100 : 0,
    };
  });

  const budgets = budgetRows.map((row) => {
    const limit = toNumber(row.budget_amount);
    const spent = toNumber(row.spent);
    const remaining = limit - spent;

    return {
      id: Number(row.budget_id),
      categoryId: row.category_id === null ? null : Number(row.category_id),
      categoryName: row.category_name,
      categoryType: row.category_type,
      limit,
      spent,
      remaining,
      percentUsed: limit > 0 ? (spent / limit) * 100 : 0,
      startDate: row.start_date,
      endDate: row.end_date,
    };
  });

  const recentTransactions = recentTransactionRows.map((row) => ({
    id: Number(row.transaction_id),
    type: row.transaction_type,
    amount: toNumber(row.amount),
    description: row.description || "Untitled transaction",
    categoryId: Number(row.category_id),
    categoryName: row.category_name,
    categoryType: row.category_type,
    date: row.transaction_date,
  }));

  const budgetLimit = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const budgetSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);

  return {
    totalIncome,
    totalExpense,
    balance,
    savingsRate: totalIncome > 0 ? (balance / totalIncome) * 100 : 0,
    transactionCounts: {
      income: toNumber(totals.income_count),
      expense: toNumber(totals.expense_count),
    },
    budgetLimit,
    budgetSpent,
    budgetRemaining: budgetLimit - budgetSpent,
    budgetPercentUsed: budgetLimit > 0 ? (budgetSpent / budgetLimit) * 100 : 0,
    topCategory: spendingByCategory[0] || null,
    spendingByCategory,
    budgets,
    recentTransactions,
  };
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

module.exports = {
  getDashboardSummary,
};
