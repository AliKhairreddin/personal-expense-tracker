# Frontend Logic — How to Plug In Your Components

This folder contains all the **state, mock data, forms, and context** for the app.
You (the UI developer) just need to import the right hook inside each screen.
No prop-drilling, no manual state management — it's all already wired.

---

## Folder map

```
src/
├── data/
│   └── mockData.js              ← realistic seed data for all features
├── context/
│   ├── AuthContext.jsx          ← login / logout / current user
│   ├── CategoryContext.jsx      ← list, add, edit, delete categories
│   ├── TransactionContext.jsx   ← list, filter, add, edit, delete transactions
│   ├── BudgetContext.jsx        ← list, add, edit, delete budgets + spending calc
│   └── SharedExpenseContext.jsx ← shared expenses + member management
├── hooks/
│   ├── useAuthForm.js           ← drives Login and Register forms
│   ├── useTransactionForm.js    ← drives Add/Edit Transaction form
│   ├── useBudgetForm.js         ← drives Add/Edit Budget form
│   └── useModal.js              ← open/close any modal with optional edit data
└── App.jsx                      ← providers + nav shell (edit this to swap in your screens)
```

---

## How to use each hook

### Auth screens (Login / Register)

```jsx
import { useAuthForm } from "../../hooks/useAuthForm";

export default function LoginScreen({ onSuccess }) {
  const { fields, errors, loading, handleChange, handleSubmit } = useAuthForm("login");
  // use "register" for the register screen

  return (
    <div>
      <input value={fields.email} onChange={handleChange("email")} placeholder="Email" />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input type="password" value={fields.password} onChange={handleChange("password")} placeholder="Password" />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <button onClick={handleSubmit(onSuccess)} disabled={loading}>
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </div>
  );
}
```

---

### Dashboard screen

```jsx
import { useTransactions } from "../../context/TransactionContext";
import { useBudgets }      from "../../context/BudgetContext";

export default function DashboardScreen() {
  const { summary, transactions } = useTransactions();
  // summary = { totalIncome, totalExpense, balance }

  const { budgets } = useBudgets();
  // budgets already have .spent, .remaining, .percentUsed attached

  return (
    <div>
      <p>Balance: ${summary.balance.toFixed(2)}</p>
      <p>Income:  ${summary.totalIncome.toFixed(2)}</p>
      <p>Expense: ${summary.totalExpense.toFixed(2)}</p>

      {/* Recent transactions */}
      {transactions.slice(0, 5).map(t => (
        <div key={t.id}>{t.description} — ${t.amount}</div>
      ))}
    </div>
  );
}
```

---

### Transactions screen (list + filter + add/edit/delete)

```jsx
import { useTransactions }    from "../../context/TransactionContext";
import { useCategories }      from "../../context/CategoryContext";
import { useModal }           from "../../hooks/useModal";
import { useTransactionForm } from "../../hooks/useTransactionForm";

export default function TransactionsScreen() {
  const { filteredTransactions, filters, updateFilter, clearFilters, deleteTransaction } = useTransactions();
  const { getCategoryById } = useCategories();
  const modal = useModal();

  return (
    <div>
      {/* Filters */}
      <select value={filters.type} onChange={e => updateFilter("type", e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input value={filters.search} onChange={e => updateFilter("search", e.target.value)} placeholder="Search…" />
      <button onClick={clearFilters}>Clear</button>

      {/* Add button */}
      <button onClick={() => modal.open()}>+ Add Transaction</button>

      {/* List */}
      {filteredTransactions.map(t => {
        const cat = getCategoryById(t.categoryId);
        return (
          <div key={t.id}>
            {cat.icon} {t.description} — ${t.amount}
            <button onClick={() => modal.open(t)}>Edit</button>
            <button onClick={() => deleteTransaction(t.id)}>Delete</button>
          </div>
        );
      })}

      {/* Modal */}
      {modal.isOpen && <TransactionModal initialData={modal.data} onClose={modal.close} />}
    </div>
  );
}

function TransactionModal({ initialData, onClose }) {
  const { fields, errors, loading, handleChange, handleSubmit } = useTransactionForm(initialData);
  const { categories } = useCategories();

  return (
    <div>
      <h2>{initialData ? "Edit" : "Add"} Transaction</h2>

      <select value={fields.type} onChange={handleChange("type")}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input value={fields.description} onChange={handleChange("description")} placeholder="Description" />
      {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

      <input type="number" value={fields.amount} onChange={handleChange("amount")} placeholder="Amount" />
      {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}

      <select value={fields.categoryId} onChange={handleChange("categoryId")}>
        <option value="">Select category…</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
      </select>
      {errors.categoryId && <p style={{ color: "red" }}>{errors.categoryId}</p>}

      <input type="date" value={fields.date} onChange={handleChange("date")} />

      <button onClick={handleSubmit(onClose)} disabled={loading}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
```

---

### Budgets screen

```jsx
import { useBudgets }    from "../../context/BudgetContext";
import { useCategories } from "../../context/CategoryContext";
import { useModal }      from "../../hooks/useModal";
import { useBudgetForm } from "../../hooks/useBudgetForm";

export default function BudgetsScreen() {
  const { budgets, deleteBudget } = useBudgets();
  const { getCategoryById }       = useCategories();
  const modal = useModal();

  return (
    <div>
      <button onClick={() => modal.open()}>+ Add Budget</button>

      {budgets.map(b => {
        const cat = getCategoryById(b.categoryId);
        return (
          <div key={b.id}>
            {cat.icon} {cat.name}: ${b.spent.toFixed(2)} / ${b.limit} ({b.percentUsed.toFixed(0)}%)
            <button onClick={() => modal.open(b)}>Edit</button>
            <button onClick={() => deleteBudget(b.id)}>Delete</button>
          </div>
        );
      })}

      {modal.isOpen && <BudgetModal initialData={modal.data} onClose={modal.close} />}
    </div>
  );
}
```

---

### Shared expenses screen

```jsx
import { useSharedExpenses } from "../../context/SharedExpenseContext";

export default function SharedScreen() {
  const { sharedExpenses, toggleMemberPaid, deleteSharedExpense } = useSharedExpenses();

  return (
    <div>
      {sharedExpenses.map(exp => (
        <div key={exp.id}>
          <h3>{exp.title} — ${exp.totalAmount}</h3>
          {exp.members.map(m => (
            <div key={m.id}>
              {m.name}: ${m.share}
              <button onClick={() => toggleMemberPaid(exp.id, m.id)}>
                {m.paid ? "✅ Paid" : "⬜ Mark Paid"}
              </button>
            </div>
          ))}
          <button onClick={() => deleteSharedExpense(exp.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
```

---

## Swapping mock data for real API calls (Milestone 3)

Every function in the context files has a `// TODO (M3):` comment showing the
exact fetch call to uncomment. The component code **does not change at all** —
just update the context internals and delete the mock.
