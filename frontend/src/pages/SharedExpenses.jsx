import { Link } from 'react-router-dom';

export default function SharedExpenses() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Shared expenses</h2>
          <p className="text-gray-500 text-sm mt-1">Track split bills and balances.</p>
        </div>
        <div className="space-x-3">
          <Link to="/shared-expenses/members" className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">Manage Members</Link>
          <Link to="/shared-expenses/new" className="px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Add Shared Expense</Link>
        </div>
      </div>

      <div className="space-y-4">
        {/* share expense 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xl">🏠</div>
            <div>
              <h3 className="font-bold text-gray-900">Utilities - May</h3>
              <p className="text-sm text-gray-500">Shared • Rent/Utilities</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">Total: $150.00</p>
            <p className="text-sm text-gray-500">Jun 01</p>
          </div>
        </div>

        {/* shared expense 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center hover:border-blue-300 transition-colors cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600 text-xl">🛒</div>
            <div>
              <h3 className="font-bold text-gray-900">Groceries - Weekly</h3>
              <p className="text-sm text-gray-500">Shared • Food</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-gray-900">Total: $80.00</p>
            <p className="text-sm text-gray-500">Jun 12</p>
          </div>
        </div>
      </div>
    </div>
  );
}
