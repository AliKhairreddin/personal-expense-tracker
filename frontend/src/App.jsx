import { useState } from "react";
import { AuthProvider, useAuth }                     from "./context/AuthContext";
import { CategoryProvider }                          from "./context/CategoryContext";
import { TransactionProvider }                       from "./context/TransactionContext";
import { BudgetProvider }                            from "./context/BudgetContext";
import { SharedExpenseProvider }                     from "./context/SharedExpenseContext";

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

//Nav tabs
const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard" },
  { key: "transactions", label: "Transactions" },
  { key: "budgets",      label: "Budgets" },
  { key: "categories",   label: "Categories" },
  { key: "shared",       label: "Shared Expenses" },
];

//inner app 
function AppShell() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh" }}>
      {}
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

      {}
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

function AuthGate() {
  const { user } = useAuth();
  const [mode, setMode] = useState("login"); 

  if (user) return <AppShell />;

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
