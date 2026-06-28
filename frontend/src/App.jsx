import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';

// Import all 10 screens
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import EditTransaction from './pages/EditTransaction';
import TransactionsList from './pages/TransactionsList';
import CreateBudget from './pages/CreateBudget';
import BudgetOverview from './pages/BudgetOverview';
import SharedExpenses from './pages/SharedExpenses';
import AddSharedExpense from './pages/AddSharedExpense';
import ManageMembers from './pages/ManageMembers';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login sits completely outside the Sidebar layout */}
        <Route path="/login" element={<Login />} />

        {/* The Sidebar wraps around all the internal routes */}
        <Route element={<Sidebar />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsList />} />
          <Route path="/transactions/new" element={<AddTransaction />} />
          <Route path="/transactions/edit/:id" element={<EditTransaction />} />
          <Route path="/budgets" element={<BudgetOverview />} />
          <Route path="/budgets/new" element={<CreateBudget />} />
          <Route path="/shared-expenses" element={<SharedExpenses />} />
          <Route path="/shared-expenses/new" element={<AddSharedExpense />} />
          <Route path="/shared-expenses/members" element={<ManageMembers />} />
        </Route>
      </Routes>
    </Router>
  );
}