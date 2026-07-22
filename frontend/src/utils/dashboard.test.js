import assert from "node:assert/strict";
import test from "node:test";
import { buildDashboardSummary, formatCurrency } from "./dashboard.js";

const categories = {
  1: { name: "Food", icon: "F", color: "#f97316" },
  2: { name: "Housing", icon: "H", color: "#8b5cf6" },
  3: { name: "Income", icon: "I", color: "#22c55e" },
};

function getCategoryById(id) {
  return categories[id] ?? { name: "Uncategorized", icon: "?", color: "#94a3b8" };
}

test("buildDashboardSummary calculates financial and budget totals", () => {
  const transactions = [
    { id: 1, type: "income", amount: 2000, categoryId: 3, date: "2026-06-01" },
    { id: 2, type: "expense", amount: 125.5, categoryId: 1, date: "2026-06-02" },
    { id: 3, type: "expense", amount: 800, categoryId: 2, date: "2026-06-03" },
  ];
  const budgets = [
    { categoryId: 1, limit: 300, spent: 125.5 },
    { categoryId: 2, limit: 900, spent: 800 },
  ];

  const summary = buildDashboardSummary(transactions, budgets, getCategoryById);

  assert.equal(summary.totalIncome, 2000);
  assert.equal(summary.totalExpense, 925.5);
  assert.equal(summary.balance, 1074.5);
  assert.equal(summary.budgetLimit, 1200);
  assert.equal(summary.budgetSpent, 925.5);
  assert.equal(summary.budgetRemaining, 274.5);
  assert.equal(summary.topCategory.name, "Housing");
  assert.deepEqual(summary.recentTransactions.map((transaction) => transaction.id), [3, 2, 1]);
});

test("buildDashboardSummary safely handles empty data", () => {
  const summary = buildDashboardSummary([], [], getCategoryById);

  assert.equal(summary.balance, 0);
  assert.equal(summary.savingsRate, 0);
  assert.equal(summary.budgetPercentUsed, 0);
  assert.equal(summary.topCategory, null);
  assert.deepEqual(summary.spendingByCategory, []);
});

test("formatCurrency returns Canadian dollar values", () => {
  assert.match(formatCurrency(1234.5), /\$1,234\.50/);
});
