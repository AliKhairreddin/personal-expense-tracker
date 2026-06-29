import { useState } from "react";
import { AuthProvider, useAuth }                     from "./context/AuthContext";
import { CategoryProvider }                          from "./context/CategoryContext";
import { TransactionProvider }                       from "./context/TransactionContext";
import { BudgetProvider }                            from "./context/BudgetContext";
import { SharedExpenseProvider }                     from "./context/SharedExpenseContext";

// ─── Placeholder screen imports ───────────────────────────────────────────────
// Your groupmate will create these files. Import them here once they exist.
// Each screen receives the hooks/context it needs; no prop-drilling required.
//
// import LoginScreen       from "./components/auth/LoginScreen";
// import RegisterScreen    from "./components/auth/RegisterScreen";
// import DashboardScreen   from "./components/dashboard/DashboardScreen";
// import TransactionsScreen from "./components/transactions/TransactionsScreen";
// import BudgetsScreen     from "./components/budgets/BudgetsScreen";
// import CategoriesScreen  from "./components/categories/CategoriesScreen";
// import SharedScreen      from "./components/shared/SharedScreen";

// ─── Temporary stub screens (remove once your groupmate's are ready) ──────────
function StubScreen({ name }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>{name}</h2>
      <p style={{ color: "#6b7280" }}>
        Your groupmate's UI components go here. The state and data from context
        are already wired up — just import the hooks you need.
      </p>
    </div>
  );
}

// ─── Navigation tabs ──────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard" },
  { key: "transactions", label: "Transactions" },
  { key: "budgets",      label: "Budgets" },
  { key: "categories",   label: "Categories" },
  { key: "shared",       label: "Shared Expenses" },
];

// ─── Inner app (rendered only when logged in) ─────────────────────────────────
function AppShell() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh" }}>
      {/* Nav bar */}
      <nav style={{ background: "#1e293b", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "#fff", fontWeight: 700, marginRight: "auto" }}>💸 ExpenseTracker</span>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            style={{
              background: activePage === item.key ? "#3b82f6" : "transparent",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "6px 14px",
              cursor: "pointer",
            }}
          >
            {item.label}
          </button>
        ))}
        <span style={{ color: "#94a3b8", marginLeft: 16 }}>Hi, {user.name}</span>
        <button onClick={logout} style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer" }}>
          Logout
        </button>
      </nav>

      {/* Screen outlet — swap StubScreen for real screens as they're built */}
      <main style={{ padding: 24 }}>
        {activePage === "dashboard"    && <StubScreen name="Dashboard" />}
        {activePage === "transactions" && <StubScreen name="Transactions" />}
        {activePage === "budgets"      && <StubScreen name="Budgets" />}
        {activePage === "categories"   && <StubScreen name="Categories" />}
        {activePage === "shared"       && <StubScreen name="Shared Expenses" />}
      </main>
    </div>
  );
}

// ─── Login gate (shown when not authenticated) ────────────────────────────────
function AuthGate() {
  const { user } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "register"

  if (user) return <AppShell />;

  // Placeholder until groupmate's auth screens are ready.
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 80, fontFamily: "sans-serif" }}>
      <h1>💸 ExpenseTracker</h1>
      <p style={{ color: "#6b7280" }}>
        {mode === "login" ? "Login screen" : "Register screen"} goes here.
      </p>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ marginTop: 12 }}>
        Switch to {mode === "login" ? "Register" : "Login"}
      </button>
      <p style={{ color: "#9ca3af", fontSize: 13, marginTop: 24 }}>
        Context is wired. Use <code>useAuth()</code> inside your auth components.
      </p>
    </div>
  );
}

// ─── Root: providers wrap everything ─────────────────────────────────────────
// Provider order matters: TransactionProvider must wrap BudgetProvider because
// BudgetContext reads from TransactionContext to compute spending.
export default function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <TransactionProvider>
          <BudgetProvider>
            <SharedExpenseProvider>
              <AuthGate />
            </SharedExpenseProvider>
          </BudgetProvider>
        </TransactionProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}
