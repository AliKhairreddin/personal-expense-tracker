const assert = require("node:assert/strict");
const test = require("node:test");
const { getDashboardSummary } = require("./dashboardService");

test("getDashboardSummary maps database rows into dashboard data", async () => {
  const db = createDatabaseStub([
    [[{
      total_income: "2000.00",
      total_expense: "925.50",
      income_count: 1,
      expense_count: 2,
    }]],
    [[
      {
        category_id: 2,
        category_name: "Housing",
        category_type: "expense",
        amount: "800.00",
      },
      {
        category_id: 1,
        category_name: "Food",
        category_type: "expense",
        amount: "125.50",
      },
    ]],
    [[
      {
        budget_id: 1,
        category_id: 1,
        category_name: "Food",
        category_type: "expense",
        budget_amount: "300.00",
        spent: "125.50",
        start_date: "2026-07-01",
        end_date: "2026-07-31",
      },
    ]],
    [[
      {
        transaction_id: 3,
        transaction_type: "expense",
        amount: "800.00",
        description: "Rent",
        category_id: 2,
        category_name: "Housing",
        category_type: "expense",
        transaction_date: "2026-07-03",
      },
    ]],
  ]);

  const summary = await getDashboardSummary(db, 1);

  assert.equal(summary.totalIncome, 2000);
  assert.equal(summary.totalExpense, 925.5);
  assert.equal(summary.balance, 1074.5);
  assert.deepEqual(summary.transactionCounts, { income: 1, expense: 2 });
  assert.equal(summary.budgetLimit, 300);
  assert.equal(summary.budgetRemaining, 174.5);
  assert.equal(summary.topCategory.name, "Housing");
  assert.equal(summary.spendingByCategory[0].percentOfExpenses, (800 / 925.5) * 100);
  assert.equal(summary.budgets[0].percentUsed, (125.5 / 300) * 100);
  assert.deepEqual(summary.recentTransactions[0], {
    id: 3,
    type: "expense",
    amount: 800,
    description: "Rent",
    categoryId: 2,
    categoryName: "Housing",
    categoryType: "expense",
    date: "2026-07-03",
  });
  assert.deepEqual(db.userIds, [1, 1, 1, 1]);
});

test("getDashboardSummary safely handles an empty account", async () => {
  const db = createDatabaseStub([
    [[{
      total_income: "0.00",
      total_expense: "0.00",
      income_count: 0,
      expense_count: 0,
    }]],
    [[]],
    [[]],
    [[]],
  ]);

  const summary = await getDashboardSummary(db, 7);

  assert.equal(summary.balance, 0);
  assert.equal(summary.savingsRate, 0);
  assert.equal(summary.budgetPercentUsed, 0);
  assert.equal(summary.topCategory, null);
  assert.deepEqual(summary.spendingByCategory, []);
  assert.deepEqual(summary.budgets, []);
  assert.deepEqual(summary.recentTransactions, []);
});

function createDatabaseStub(results) {
  let queryIndex = 0;

  return {
    userIds: [],
    async query(_query, parameters) {
      this.userIds.push(parameters[0]);
      const result = results[queryIndex];
      queryIndex += 1;
      return result;
    },
  };
}
