import assert from "node:assert/strict";
import test from "node:test";
import {
  EMPTY_DASHBOARD_SUMMARY,
  normalizeDashboardSummary,
} from "./dashboardApi.js";

test("normalizeDashboardSummary adds category presentation data", () => {
  const summary = normalizeDashboardSummary({
    totalIncome: 2500,
    transactionCounts: { income: 2, expense: 1 },
    spendingByCategory: [
      {
        categoryId: 1,
        name: "Food & Dining",
        type: "expense",
        amount: 50,
        percentOfExpenses: 100,
      },
    ],
    budgets: [
      {
        id: 1,
        categoryId: 1,
        categoryName: "Food & Dining",
        categoryType: "expense",
      },
    ],
    recentTransactions: [
      {
        id: 1,
        categoryId: 1,
        categoryName: "Food & Dining",
        categoryType: "expense",
      },
    ],
  });

  assert.equal(summary.spendingByCategory[0].icon, "🍔");
  assert.match(summary.spendingByCategory[0].color, /^#[0-9a-f]{6}$/i);
  assert.equal(summary.budgets[0].category.name, "Food & Dining");
  assert.equal(summary.recentTransactions[0].category.icon, "🍔");
  assert.equal(summary.topCategory.name, "Food & Dining");
  assert.deepEqual(summary.transactionCounts, { income: 2, expense: 1 });
});

test("normalizeDashboardSummary provides a complete empty state", () => {
  const summary = normalizeDashboardSummary();

  assert.deepEqual(summary, EMPTY_DASHBOARD_SUMMARY);
});
