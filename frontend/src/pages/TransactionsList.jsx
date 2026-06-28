export default function TransactionsList() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage all your income and expenses.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Add Transaction
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* toolbar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full pl-3 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filter
          </button>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200 text-sm text-gray-500">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Row 1 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-600">2025-06-05</td>
                <td className="p-4 font-medium text-gray-900">Groceries at Walmart</td>
                <td className="p-4 text-gray-600">Food</td>
                <td className="p-4 text-gray-600">Expense</td>
                <td className="p-4 font-medium text-gray-900">$45.50</td>
                <td className="p-4 text-center space-x-3 text-gray-400">
                  <button className="hover:text-blue-600">✏️</button>
                  <button className="hover:text-red-600">🗑️</button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-600">2025-06-04</td>
                <td className="p-4 font-medium text-gray-900">Gas Station</td>
                <td className="p-4 text-gray-600">Transportation</td>
                <td className="p-4 text-gray-600">Expense</td>
                <td className="p-4 font-medium text-gray-900">$60.00</td>
                <td className="p-4 text-center space-x-3 text-gray-400">
                  <button className="hover:text-blue-600">✏️</button>
                  <button className="hover:text-red-600">🗑️</button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-600">2025-06-01</td>
                <td className="p-4 font-medium text-gray-900">Salary</td>
                <td className="p-4 text-gray-600">Income</td>
                <td className="p-4 text-gray-600">Income</td>
                <td className="p-4 font-medium text-green-600">$3,000.00</td>
                <td className="p-4 text-center space-x-3 text-gray-400">
                  <button className="hover:text-blue-600">✏️</button>
                  <button className="hover:text-red-600">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-center gap-2 text-sm">
          <button className="px-3 py-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">&lt;</button>
          <button className="px-3 py-1 bg-blue-50 text-blue-600 font-medium border border-blue-200 rounded">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}
