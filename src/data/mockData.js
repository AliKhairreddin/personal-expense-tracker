// ─── Mock Data ───────────────────────────────────────────────────────────────
// This file provides realistic seed data for all features while the backend
// database is not yet connected. Replace these arrays with real API calls
// in Milestone 3.

export const MOCK_USER = {
  id: 1,
  name: "Alex Johnson",
  email: "alex@example.com",
};

export const DEFAULT_CATEGORIES = [
  { id: 1, name: "Food & Dining", icon: "🍔", color: "#f97316", isCustom: false },
  { id: 2, name: "Transportation", icon: "🚗", color: "#3b82f6", isCustom: false },
  { id: 3, name: "Housing", icon: "🏠", color: "#8b5cf6", isCustom: false },
  { id: 4, name: "Entertainment", icon: "🎬", color: "#ec4899", isCustom: false },
  { id: 5, name: "Health", icon: "💊", color: "#10b981", isCustom: false },
  { id: 6, name: "Shopping", icon: "🛍️", color: "#f59e0b", isCustom: false },
  { id: 7, name: "Education", icon: "📚", color: "#6366f1", isCustom: false },
  { id: 8, name: "Income", icon: "💰", color: "#22c55e", isCustom: false },
];

export const MOCK_TRANSACTIONS = [
  { id: 1, type: "expense", amount: 45.50, description: "Grocery run", categoryId: 1, date: "2025-06-01" },
  { id: 2, type: "income",  amount: 2500,  description: "Monthly salary", categoryId: 8, date: "2025-06-01" },
  { id: 3, type: "expense", amount: 12.99, description: "Netflix subscription", categoryId: 4, date: "2025-06-02" },
  { id: 4, type: "expense", amount: 60.00, description: "Gas", categoryId: 2, date: "2025-06-03" },
  { id: 5, type: "expense", amount: 850,   description: "Rent", categoryId: 3, date: "2025-06-04" },
  { id: 6, type: "expense", amount: 23.40, description: "Lunch with friends", categoryId: 1, date: "2025-06-05" },
  { id: 7, type: "income",  amount: 300,   description: "Freelance payment", categoryId: 8, date: "2025-06-06" },
  { id: 8, type: "expense", amount: 35.00, description: "Gym membership", categoryId: 5, date: "2025-06-07" },
  { id: 9, type: "expense", amount: 89.99, description: "New shoes", categoryId: 6, date: "2025-06-08" },
  { id: 10, type: "expense", amount: 15.00, description: "Textbook", categoryId: 7, date: "2025-06-09" },
];

export const MOCK_BUDGETS = [
  { id: 1, categoryId: 1, limit: 400, period: "monthly" },
  { id: 2, categoryId: 2, limit: 150, period: "monthly" },
  { id: 3, categoryId: 4, limit: 100, period: "monthly" },
  { id: 4, categoryId: 6, limit: 200, period: "monthly" },
];

export const MOCK_SHARED_EXPENSES = [
  {
    id: 1,
    title: "Apartment utilities",
    totalAmount: 180,
    date: "2025-06-01",
    members: [
      { id: 1, name: "Alex Johnson", share: 60, paid: true },
      { id: 2, name: "Sam Lee",      share: 60, paid: false },
      { id: 3, name: "Jordan Kim",   share: 60, paid: true },
    ],
  },
  {
    id: 2,
    title: "Road trip gas",
    totalAmount: 120,
    date: "2025-06-10",
    members: [
      { id: 1, name: "Alex Johnson", share: 40, paid: true },
      { id: 2, name: "Sam Lee",      share: 40, paid: true },
      { id: 3, name: "Jordan Kim",   share: 40, paid: false },
    ],
  },
];
