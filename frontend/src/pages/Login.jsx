import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="mx-auto h-12 w-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl shadow-sm mb-4">💳</div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Log in to your account</h2>
        <p className="mt-2 text-sm text-gray-600">Enter your details to sign in.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-gray-200 sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-1">Email address</label>
              <input id="email" name="email" type="email" placeholder="name@company.com" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-1">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <div>
              <label htmlFor="authType" className="block text-sm font-semibold text-gray-900 mb-1">Sign-in type</label>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="border-2 border-blue-600 text-blue-700 bg-blue-50 rounded-lg py-2 text-sm font-semibold">Password</button>
                <button type="button" className="border border-gray-300 text-gray-700 rounded-lg py-2 text-sm font-medium hover:bg-gray-50">One-time code</button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
              </div>
              {/* Wire up auth submit handler */}
              <Link to="/" className="w-1/2 flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}