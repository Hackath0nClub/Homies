import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import router from 'next/router'

export const useAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState()

  useEffect(() => {
    const user = supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event)
      console.log('session', session)
      // setUser(session.user)
    })
    console.log('user', user)
    // setUser(supabase.auth.user())
    // supabase.auth.onAuthStateChange(() => {
    //   setUser(supabase.auth.user())
    // })
  }, [])

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error
      // router.push('/')
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
      // router.push('/')
    } catch (error) {
      console.error(error)
      if (error instanceof Error) alert(error.message)
    }
  }

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      // router.push('/')
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
    handleSignout,
  }
}
