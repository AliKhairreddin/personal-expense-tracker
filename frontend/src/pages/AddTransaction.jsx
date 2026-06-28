export default function AddTransaction() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm font-sans">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add a transaction</h2>
        <p className="text-gray-500 mt-2 text-sm">Record a new income or expense.</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          <div>
            <label htmlFor="transactionType" className="block text-sm font-semibold text-gray-900 mb-1">Transaction type</label>
            <select id="transactionType" name="transactionType" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="">Choose type</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* category */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-900 mb-1">Category</label>
            <select id="categoryId" name="categoryId" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="">e.g., Food, Rent, Subscriptions</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-900 mb-1">Amount</label>
            <input type="number" step="0.01" id="amount" name="amount" placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          {/* date */}
          <div>
            <label htmlFor="transactionDate" className="block text-sm font-semibold text-gray-900 mb-1">Transaction date</label>
            <input type="date" id="transactionDate" name="transactionDate" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          {/* descriptin */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
            <input type="text" id="description" name="description" placeholder="Optional notes" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          {/* add to budget */}
          <div className="md:col-span-2">
            <label htmlFor="budgetId" className="block text-sm font-semibold text-gray-900 mb-1">Attach to budget (optional)</label>
            <select id="budgetId" name="budgetId" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="">Auto-match by category</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100 mt-8">
          <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Save Transaction</button>
        </div>
      </form>
    </div>
  );
}
