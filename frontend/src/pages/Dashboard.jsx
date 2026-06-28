export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Top Header Section */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
          <p className="text-gray-500">Overview of your monthly activity.</p>
          <div className="flex justify-center space-x-4 pt-4">
            <button className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">View Budgets</button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Add Transaction</button>
          </div>
        </div>
        <div className="flex justify-center space-x-8 pt-6 mt-4 border-t border-gray-100">
          <button className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-2">Overview</button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800 pb-2 transition-colors">Recent activity</button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800 pb-2 transition-colors">Insights</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        

        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">This month at a glance</h3>
            <p className="text-sm text-gray-500 mb-4">A quick summary of income, spending, and budget health.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Top Row */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Total Income</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$0.00</p>
              <p className="text-xs text-green-500 mt-1">+0%</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$0.00</p>
              <p className="text-xs text-red-500 mt-1">+0%</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Budget Used</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">0%</p>
              <p className="text-xs text-gray-400 mt-1">-$0.00</p>
            </div>
            
            {/* Bottom Row */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$0.00</p>
              <p className="text-xs text-gray-400 mt-1">0 bills</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Top Category</p>
              <p className="text-xl font-bold text-gray-900 mt-2 truncate">--</p>
              <p className="text-xs text-gray-400 mt-1">0% of total</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-500 font-medium">Net Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$0.00</p>
              <p className="text-xs text-green-500 mt-1">+0%</p>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-1">Spending Trend</h3>
          <p className="text-xs text-gray-500 mb-6">Amount ($)</p>
          <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 min-h-[250px]">
            <p className="text-gray-400 font-medium">[Chart Component Placeholder]</p>
          </div>
          <p className="text-xs text-gray-500 text-right mt-2">Week</p>
        </div>

      </div>
    </div>
  );
}
