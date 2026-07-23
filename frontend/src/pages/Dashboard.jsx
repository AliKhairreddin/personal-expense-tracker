import { useAuth } from "../context/AuthContext";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { formatCurrency } from "../utils/dashboard";

export default function Dashboard({ onNavigate }) {
  const { user } = useAuth();
  const { summary, loading, error, reload } = useDashboardSummary(user.id);
  const { budgets, transactionCounts } = summary;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Financial overview</p>
          <h1>Welcome back, {firstName}.</h1>
          <p>Here’s the clearest view of your money right now.</p>
        </div>
        <button className="button button--primary" type="button" onClick={() => onNavigate("transactions")}>
          <span aria-hidden="true">＋</span> Add transaction
        </button>
      </header>

      {loading && (
        <div className="dashboard-notice" role="status">
          Loading your latest financial summary…
        </div>
      )}

      {error && (
        <div className="dashboard-notice dashboard-notice--error" role="alert">
          <span>Dashboard data could not be loaded: {error}</span>
          <button type="button" onClick={reload}>Try again</button>
        </div>
      )}

      <section className="summary-grid" aria-label="Account summary">
        <SummaryCard
          label="Available balance"
          value={formatCurrency(summary.balance)}
          note={summary.balance >= 0 ? `${formatPercent(summary.savingsRate)} of income kept` : "Spending is above income"}
          tone={summary.balance >= 0 ? "forest" : "coral"}
          featured
          icon="balance"
        />
        <SummaryCard
          label="Total income"
          value={formatCurrency(summary.totalIncome)}
          note={`${transactionCounts.income} recorded deposits`}
          tone="mint"
          icon="income"
        />
        <SummaryCard
          label="Total spent"
          value={formatCurrency(summary.totalExpense)}
          note={`${transactionCounts.expense} recorded expenses`}
          tone="peach"
          icon="expense"
        />
        <SummaryCard
          label="Budget remaining"
          value={formatCurrency(summary.budgetRemaining)}
          note={summary.budgetLimit ? `${formatPercent(summary.budgetPercentUsed)} used of ${formatCurrency(summary.budgetLimit)}` : "No budgets created yet"}
          tone="sand"
          icon="budget"
        />
      </section>

      <div className="dashboard-grid">
        <section className="panel spending-panel">
          <PanelHeader
            eyebrow="Spending breakdown"
            title="Where your money went"
            action="View transactions"
            onAction={() => onNavigate("transactions")}
          />
          {summary.spendingByCategory.length ? (
            <div className="category-breakdown">
              <div className="donut-wrap">
                <div className="donut" style={{ "--donut": buildDonut(summary.spendingByCategory) }}>
                  <div className="donut__center">
                    <span>Total spent</span>
                    <strong>{formatCurrency(summary.totalExpense)}</strong>
                  </div>
                </div>
              </div>
              <div className="category-list">
                {summary.spendingByCategory.slice(0, 5).map((category) => (
                  <div className="category-row" key={category.categoryId}>
                    <span className="category-row__dot" style={{ background: category.color }} />
                    <div className="category-row__copy">
                      <div><strong>{category.name}</strong><span>{formatCurrency(category.amount)}</span></div>
                      <div className="progress-track" aria-label={`${category.name}, ${formatPercent(category.percentOfExpenses)} of expenses`}>
                        <span style={{ width: `${Math.min(category.percentOfExpenses, 100)}%`, background: category.color }} />
                      </div>
                    </div>
                    <span className="category-row__percent">{formatPercent(category.percentOfExpenses)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState title="No spending yet" copy="Add an expense to see a category breakdown." />
          )}
        </section>

        <section className="panel budget-panel">
          <PanelHeader eyebrow="Monthly guardrails" title="Budget health" action="Manage" onAction={() => onNavigate("budgets")} />
          {budgets.length ? (
            <div className="budget-list">
              {budgets.slice(0, 4).map((budget) => {
                const category = budget.category;
                const isOver = budget.remaining < 0;
                return (
                  <div className="budget-item" key={budget.id}>
                    <div className="budget-item__head">
                      <div className="category-icon" style={{ background: `${category.color}1f`, color: category.color }}>{category.icon}</div>
                      <div><strong>{category.name}</strong><span>{formatCurrency(budget.spent)} of {formatCurrency(budget.limit)}</span></div>
                      <span className={isOver ? "status status--danger" : "status"}>{isOver ? "Over" : `${Math.round(budget.percentUsed)}%`}</span>
                    </div>
                    <div className="progress-track progress-track--large">
                      <span className={isOver ? "progress--danger" : ""} style={{ width: `${Math.min(budget.percentUsed, 100)}%`, background: isOver ? undefined : category.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No budgets yet" copy="Create a budget to track category limits." />
          )}
          <button className="text-button budget-panel__action" type="button" onClick={() => onNavigate("budgets")}>View all budgets <span aria-hidden="true">→</span></button>
        </section>

        <section className="panel recent-panel">
          <PanelHeader eyebrow="Latest activity" title="Recent transactions" action="See all" onAction={() => onNavigate("transactions")} />
          {summary.recentTransactions.length ? (
            <div className="transaction-list">
              {summary.recentTransactions.map((transaction) => {
                const category = transaction.category;
                const isIncome = transaction.type === "income";
                return (
                  <div className="transaction-row" key={transaction.id}>
                    <div className="category-icon category-icon--large" style={{ background: `${category.color}1f`, color: category.color }}>{category.icon}</div>
                    <div className="transaction-row__copy">
                      <strong>{transaction.description}</strong>
                      <span>{category.name} · {formatDate(transaction.date)}</span>
                    </div>
                    <strong className={isIncome ? "amount amount--income" : "amount"}>{isIncome ? "+" : "−"}{formatCurrency(transaction.amount)}</strong>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState title="No transactions yet" copy="Your most recent activity will appear here." />
          )}
        </section>

        <aside className="insight-card">
          <span className="insight-card__icon" aria-hidden="true">✦</span>
          <p className="eyebrow">A useful signal</p>
          {summary.topCategory ? (
            <>
              <h2>{summary.topCategory.name} is your largest spending category.</h2>
              <p>It accounts for {formatPercent(summary.topCategory.percentOfExpenses)} of recorded expenses ({formatCurrency(summary.topCategory.amount)}).</p>
            </>
          ) : (
            <><h2>Your first insight is one transaction away.</h2><p>Record an expense and we’ll highlight your biggest spending category.</p></>
          )}
          <button className="button button--light" type="button" onClick={() => onNavigate("transactions")}>Review activity <span aria-hidden="true">→</span></button>
        </aside>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, note, tone, featured = false, icon }) {
  return (
    <article className={`summary-card summary-card--${tone} ${featured ? "summary-card--featured" : ""}`}>
      <div className="summary-card__top">
        <span>{label}</span>
        <SummaryIcon name={icon} />
      </div>
      <strong>{value}</strong>
      <p>{note}</p>
    </article>
  );
}

function SummaryIcon({ name }) {
  const content = { balance: "↗", income: "+", expense: "−", budget: "◔" };
  return <span className="summary-icon" aria-hidden="true">{content[name]}</span>;
}

function PanelHeader({ eyebrow, title, action, onAction }) {
  return (
    <header className="panel-header">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      <button className="text-button" type="button" onClick={onAction}>{action} <span aria-hidden="true">→</span></button>
    </header>
  );
}

function EmptyState({ title, copy }) {
  return <div className="empty-state"><span aria-hidden="true">○</span><strong>{title}</strong><p>{copy}</p></div>;
}

function formatPercent(value) {
  return `${Math.round(Math.abs(value))}%`;
}

function formatDate(date) {
  if (!date) return "No date";
  return new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${date}T00:00:00Z`));
}

function buildDonut(categories) {
  let start = 0;
  const segments = categories.map((category) => {
    const end = start + category.percentOfExpenses;
    const segment = `${category.color} ${start}% ${end}%`;
    start = end;
    return segment;
  });
  return `conic-gradient(${segments.join(", ")})`;
}
