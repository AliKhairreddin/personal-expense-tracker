export default function EditTransaction() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm font-sans">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Edit transaction</h2>
        <p className="text-gray-500 mt-2 text-sm">Modify this record.</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="transactionType" className="block text-sm font-semibold text-gray-900 mb-1">Transaction type</label>
            <select id="transactionType" name="transactionType" defaultValue="expense" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-900 mb-1">Category</label>
            <select id="categoryId" name="categoryId" defaultValue="food" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="food">Food</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-900 mb-1">Amount</label>
            <input type="number" step="0.01" id="amount" name="amount" defaultValue="45.50" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label htmlFor="transactionDate" className="block text-sm font-semibold text-gray-900 mb-1">Transaction date</label>
            <input type="date" id="transactionDate" name="transactionDate" defaultValue="2025-06-05" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
            <input type="text" id="description" name="description" defaultValue="Groceries at Walmart" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-100 mt-8 gap-4">
          <button type="button" className="w-full sm:w-auto px-6 py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            Delete Transaction
          </button>
          <div className="flex space-x-4 w-full sm:w-auto">
            <button type="button" className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Save Changes</button>
          </div>
        </div>
      </form>
    </div>
  );
}