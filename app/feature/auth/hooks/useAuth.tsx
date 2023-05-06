import { useState } from 'react'
import router from 'next/router'
import { useRecoilState } from 'recoil'
import { sessionState } from '../store/authState'
import {
  emailSignIn,
  emailSignUp,
  signOut,
  getSession,
} from '../infrastructure/Authentication'

export const useAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useRecoilState(sessionState)

  const handleLogin = async () => {
    await emailSignIn(email, password)
    const currentSession = await getSession()
    setSession(currentSession)
    router.push('/')
  }

  const handleSignUp = async () => {
    await emailSignUp(email, password)
    const currentSession = await getSession()
    setSession(currentSession)
    router.push('/')
  }

  const handleSignout = async () => {
    await signOut()
    const currentSession = await getSession()
    setSession(currentSession)
    router.push('/')
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
