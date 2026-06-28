import { Link, useLocation, Outlet } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "New Transaction", path: "/transactions/new" },
    { name: "Transactions", path: "/transactions" },
    { name: "Budgets", path: "/budgets" },
    { name: "Shared Expenses", path: "/shared-expenses" }
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Expense Tracker</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block w-full text-left px-4 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link 
            to="/login" 
            className="block w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            Log out
          </Link>
        </div>
      </div>

      {/* Render nested routes */}
      <div className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  );
}