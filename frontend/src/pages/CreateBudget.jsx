export default function CreateBudget() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm font-sans">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create budget</h2>
        <p className="text-gray-500 mt-2 text-sm">Set monthly spending limits.</p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="budgetType" className="block text-sm font-semibold text-gray-900 mb-1">Budget type</label>
            <select id="budgetType" name="budgetType" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="monthly">Monthly or Category-based</option>
            </select>
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-900 mb-1">Category</label>
            <select id="categoryId" name="categoryId" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
              <option value="">Optional: choose a category</option>
              <option value="food">Food</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-900 mb-1">Budget amount</label>
            <input type="number" step="0.01" id="amount" name="amount" placeholder="0.00" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold text-gray-900 mb-1">Start date</label>
            <input type="date" id="startDate" name="startDate" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold text-gray-900 mb-1">End date</label>
            <input type="date" id="endDate" name="endDate" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
          
          <div>
            <label htmlFor="notes" className="block text-sm font-semibold text-gray-900 mb-1">Notes (optional)</label>
            <input type="text" id="notes" name="notes" placeholder="e.g., Keep food under $250" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100 mt-8">
          <button type="button" className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">Back</button>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Save Budget</button>
        </div>
      </form>
    </div>
  );
}
