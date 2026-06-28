import { Link } from 'react-router-dom';

export default function BudgetOverview() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budgets</h2>
          <p className="text-gray-500 text-sm mt-1">Track your budget progress and stay on target.</p>
        </div>
        <Link to="/budgets/new" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Create Budget
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Budget 1 */}
        <div className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-bold text-gray-900">Food Budget</h3>
              <p className="text-sm text-gray-500">Jun 1 - Jun 30</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$180.00 / $250.00</p>
              <p className="text-sm text-gray-500">72% used</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        {/* Budget 2 */}
        <div className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-bold text-gray-900">Entertainment</h3>
              <p className="text-sm text-gray-500">Jun 1 - Jun 30</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$90.00 / $150.00</p>
              <p className="text-sm text-gray-500">60% used</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Budget 3 */}
        <div className="p-6 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-bold text-gray-900">Transportation</h3>
              <p className="text-sm text-gray-500">Jun 1 - Jun 30</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">$50.00 / $100.00</p>
              <p className="text-sm text-gray-500">50% used</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center">Budgets are updated automatically as you add transactions.</p>
    </div>
  );
}