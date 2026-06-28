export default function ManageMembers() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Members</h2>
          <p className="text-gray-500 text-sm mt-1">Manage group access.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
              <th className="p-4 font-medium">Member</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr className="border-b border-gray-100">
              <td className="p-4 font-medium text-gray-900">Alex Johnson</td>
              <td className="p-4 text-gray-600">alex@email.com</td>
              <td className="p-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Owner</span></td>
              <td className="p-4 text-right"></td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-4 font-medium text-gray-900">Sarah Williams</td>
              <td className="p-4 text-gray-600">sarah@email.com</td>
              <td className="p-4"><span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Member</span></td>
              <td className="p-4 text-right"><button className="text-red-600 hover:text-red-800 font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50">Remove</button></td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-900">Mike Brown</td>
              <td className="p-4 text-gray-600">mike@email.com</td>
              <td className="p-4"><span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">Member</span></td>
              <td className="p-4 text-right"><button className="text-red-600 hover:text-red-800 font-medium border border-red-200 px-3 py-1 rounded hover:bg-red-50">Remove</button></td>
            </tr>
          </tbody>
        </table>
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
          The owner can manage members and shared expenses.
        </div>
      </div>
    </div>
  );
}