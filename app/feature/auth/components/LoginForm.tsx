import React, { useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import router from 'next/router'

async function handleLogin(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log(data)
    router.push('/')
  } catch (error) {
    if (error instanceof Error) alert(error.message)
  }
}

async function handleSignUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(data)
    router.push('/')
  } catch (error) {
    if (error instanceof Error) alert(error.message)
  }
}

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any, isLogin: boolean) => {
    e.preventDefault()
    if (isLogin) {
      await handleLogin(email, password)
    } else {
      await handleSignUp(email, password)
    }
  }

  return (
    <form className="w-full max-w-sm">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          className="px-4 py-2 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type="submit"
          onClick={(e) => handleSubmit(e, true)}
        >
          Sign In
        </button>
        <button
          className="px-4 py-2 text-gray-800 transition-colors duration-300 border border-gray-200 bg-gray-200 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 hover:text-white"
          type="submit"
          onClick={(e) => handleSubmit(e, false)}
        >
          Sign Up
        </button>
      </div>
    </form>
  )
}

export default LoginForm
