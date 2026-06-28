export default function AddSharedExpense() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm font-sans">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Adds shared expense (split)</h2>
        <p className="text-gray-500 mt-2 text-sm">Split a new bill.</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-1">Title</label>
            <input type="text" id="title" name="title" placeholder="e.g. Rent, Groceries, Internet" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label htmlFor="expenseDate" className="block text-sm font-semibold text-gray-900 mb-1">Expense date</label>
            <input type="date" id="expenseDate" name="expenseDate" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label htmlFor="totalAmount" className="block text-sm font-semibold text-gray-900 mb-1">Total amount</label>
            <input type="number" step="0.01" id="totalAmount" name="totalAmount" placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-1">Description (optional)</label>
            <input type="text" id="description" name="description" placeholder="Notes for the group" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100 mt-8">
          <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Continue to Members</button>
        </div>
      </form>
    </div>
  );
}
