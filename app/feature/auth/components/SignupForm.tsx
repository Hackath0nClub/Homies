import { useAuth } from '../hooks/useAuth'

const SignupForm = () => {
  const { email, password, setEmail, setPassword, handleSignUp } = useAuth()

  return (
    <div className="w-full max-w-sm">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 text-gray-800 transition-colors duration-300 border border-gray-200 bg-gray-200 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 hover:text-white"
        type="submit"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  )
}

export default SignupForm
