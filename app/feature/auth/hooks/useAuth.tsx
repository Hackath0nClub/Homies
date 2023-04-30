import { useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import router from 'next/router'

export const useAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error(error)
      if (error instanceof Error) alert(error.message)
    }
  }

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error(error)
      if (error instanceof Error) alert(error.message)
    }
  }

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUp,
  }
}
