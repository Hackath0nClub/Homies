import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import router from 'next/router'
import { getCurrentDateTime } from '../../../lib/getCurrentDateTime'
import { useRecoilState } from 'recoil'
import { sessionState } from '../store/authState'

export const useAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useRecoilState(sessionState)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) console.log('session.user', session.user.email)
      if (!session) console.log("session doesn't exist")
      setSession(session)
    })
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
      console.log('data', data)
      // router.push('/')

      if (!data) return
      // Sign up時にprofileを作成する
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .insert({
          uuid: data.user?.id,
          id: data.user?.email?.split('@')[0] + getCurrentDateTime(),
          name: data.user?.email?.split('@')[0],
          icon_url: '',
          text: '',
          twitter_url: '',
          soundcloud_url: '',
          mixcloud_url: '',
          create_at: data.user?.created_at,
          updated_at: data.user?.created_at,
        })
      if (profileError) throw profileError
      console.log('profileData', profileData)
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
    session,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUp,
    handleSignout,
  }
}
