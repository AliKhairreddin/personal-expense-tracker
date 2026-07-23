import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BudgetProvider } from "./context/BudgetContext";
import { CategoryProvider } from "./context/CategoryContext";
import { SharedExpenseProvider } from "./context/SharedExpenseContext";
import { TransactionProvider } from "./context/TransactionContext";
import { useAuthForm } from "./hooks/useAuthForm";
import CategoriesPage from "./pages/CategoriesPage";
import Dashboard from "./pages/Dashboard";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "grid" },
  { key: "transactions", label: "Transactions", icon: "transactions" },
  { key: "budgets", label: "Budgets", icon: "wallet" },
  { key: "categories", label: "Categories", icon: "tag" },
  { key: "shared", label: "Shared expenses", icon: "users" },
];

function AppShell() {
  const { user, logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const page = NAV_ITEMS.find((item) => item.key === activePage);
    document.title = `${page?.label ?? "Dashboard"} — Expense Tracker`;
  }, [activePage]);

  function navigate(page) {
    setActivePage(page);
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`} aria-label="Primary navigation">
        <div className="brand">
          <div className="brand__mark" aria-hidden="true">E</div>
          <div>
            <strong>Expense Tracker</strong>
            <span>Personal finance</span>
          </div>
        </div>

        <nav className="nav-list">
          <p className="nav-list__label">Workspace</p>
          {NAV_ITEMS.map((item) => (
            <button
              className={`nav-item ${activePage === item.key ? "nav-item--active" : ""}`}
              key={item.key}
              onClick={() => navigate(item.key)}
              type="button"
              aria-current={activePage === item.key ? "page" : undefined}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__tip">
          <span className="sidebar__tip-icon" aria-hidden="true">↗</span>
          <strong>Build a better habit</strong>
          <p>Review your dashboard weekly to stay on track.</p>
        </div>

        <div className="profile-card">
          <div className="avatar" aria-hidden="true">{getInitials(user.name)}</div>
          <div className="profile-card__copy">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <button className="icon-button" onClick={logout} type="button" aria-label="Log out">
            <Icon name="logout" />
          </button>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
          type="button"
        />
      )}

      <div className="app-content">
        <header className="mobile-header">
          <button className="icon-button" onClick={() => setMenuOpen(true)} type="button" aria-label="Open navigation">
            <Icon name="menu" />
          </button>
          <div className="mobile-brand"><span>E</span> Expense Tracker</div>
          <div className="avatar avatar--small" aria-hidden="true">{getInitials(user.name)}</div>
        </header>

        <main id="main-content" className="page-container">
          {activePage === "dashboard" ? (
            <Dashboard onNavigate={navigate} />
          ) : activePage === "categories" ? (
            <CategoriesPage />
          ) : (
            <IntegrationPlaceholder
              page={NAV_ITEMS.find((item) => item.key === activePage)}
              onBack={() => navigate("dashboard")}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function IntegrationPlaceholder({ page, onBack }) {
  return (
    <section className="integration-placeholder">
      <div className="integration-placeholder__icon"><Icon name={page.icon} /></div>
      <p className="eyebrow">Ready for integration</p>
      <h1>{page.label}</h1>
      <p>
        The application shell and shared state are ready. This screen will plug into the
        component being delivered by the teammate assigned to {page.label.toLowerCase()}.
      </p>
      <button className="button button--secondary" onClick={onBack} type="button">
        <Icon name="arrow-left" /> Back to dashboard
      </button>
    </section>
  );
}

function AuthGate() {
  const { user } = useAuth();
  const [mode, setMode] = useState("login");

  if (user) return <AppShell />;

  return <AuthScreen key={mode} mode={mode} onModeChange={setMode} />;
}

function AuthScreen({ mode, onModeChange }) {
  const { fields, errors, loading, handleChange, handleSubmit } = useAuthForm(mode);
  const isLogin = mode === "login";

  useEffect(() => {
    document.title = `${isLogin ? "Sign in" : "Create account"} — Expense Tracker`;
  }, [isLogin]);

  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="Expense Tracker introduction">
        <div className="auth-story__content">
          <div className="brand brand--light">
            <div className="brand__mark" aria-hidden="true">E</div>
            <div><strong>Expense Tracker</strong><span>Personal finance</span></div>
          </div>
          <div className="auth-story__message">
            <span className="auth-story__kicker">Money, made clear</span>
            <h1>Know where it goes.<br />Choose where it takes you.</h1>
            <p>One calm place for daily spending, budgets, and shared costs.</p>
          </div>
          <div className="auth-story__preview" aria-hidden="true">
            <div><span>Available balance</span><strong>$1,668.12</strong></div>
            <div className="preview-bars"><i /><i /><i /><i /><i /><i /></div>
            <span className="preview-caption">Your spending, finally in focus.</span>
          </div>
        </div>
      </section>

      <section className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit()} noValidate>
          <p className="eyebrow">{isLogin ? "Welcome back" : "Start tracking"}</p>
          <h2>{isLogin ? "Sign in to your account" : "Create your account"}</h2>
          <p className="auth-form__intro">
            {isLogin ? "Your financial overview is waiting." : "A clearer view of your money starts here."}
          </p>

          {!isLogin && (
            <FormField
              id="name"
              label="Full name"
              value={fields.name}
              onChange={handleChange("name")}
              error={errors.name}
              autoComplete="name"
              placeholder="Alex Johnson"
            />
          )}
          <FormField
            id="email"
            label="Email address"
            type="email"
            value={fields.email}
            onChange={handleChange("email")}
            error={errors.email}
            autoComplete="email"
            placeholder="alex@example.com"
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            value={fields.password}
            onChange={handleChange("password")}
            error={errors.password}
            autoComplete={isLogin ? "current-password" : "new-password"}
            placeholder="At least 6 characters"
          />
          {!isLogin && (
            <FormField
              id="confirm-password"
              label="Confirm password"
              type="password"
              value={fields.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={errors.confirmPassword}
              autoComplete="new-password"
              placeholder="Repeat your password"
            />
          )}

          <button className="button button--primary button--full" disabled={loading} type="submit">
            {loading ? <span className="spinner" aria-label="Please wait" /> : (isLogin ? "Sign in" : "Create account")}
          </button>

          <p className="auth-switch">
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => onModeChange(isLogin ? "register" : "login")}>
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
          <p className="demo-note">Demo mode: use any valid email and a password with 6+ characters.</p>
        </form>
      </section>
    </main>
  );
}

function FormField({ id, label, error, ...inputProps }) {
  const errorId = `${id}-error`;
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} {...inputProps} />
      {error && <span className="form-error" id={errorId}>{error}</span>}
    </div>
  );
}

function Icon({ name }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    transactions: <><path d="M7 7h11l-3-3" /><path d="m18 7-3 3" /><path d="M17 17H6l3 3" /><path d="m6 17 3-3" /></>,
    wallet: <><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v3H6.5a2.5 2.5 0 0 1 0-5" /><path d="M4 6v12a2 2 0 0 0 2 2h14V8H6.5" /><path d="M16 13h1" /></>,
    tag: <><path d="M20 13 13 20l-9-9V4h7Z" /><circle cx="8.5" cy="8.5" r="1.25" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    logout: <><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    "arrow-left": <><path d="m15 18-6-6 6-6" /><path d="M9 12h12" /></>,
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] ?? paths.grid}
    </svg>
  );
}

function getInitials(name = "User") {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
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
