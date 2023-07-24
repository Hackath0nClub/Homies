import { useEffect, useState } from 'react'
import router from 'next/router'
import { useRecoilState } from 'recoil'
import { authState, sessionState } from '../store/authState'
import {
  emailSignIn,
  emailSignUp,
  googleSignIn,
  signOut,
  getSession,
} from '../infrastructure/Authentication'
import { selectProfileByUuid } from '../infrastructure/profileRepository'

export const useAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useRecoilState(sessionState)
  const [auth, setAuth] = useRecoilState(authState)

  useEffect(() => {
    const getInitSession = async () => {
      const currentSession = await getSession()
      setSession(currentSession)
      if (!currentSession) return
      const uuid = currentSession.user.id
      const currentAuth = await selectProfileByUuid(uuid)
      if (!currentAuth) return
      setAuth(currentAuth)
    }
    getInitSession()
  }, [])

  const handleLogin = async () => {
    await emailSignIn(email, password)
    const currentSession = await getSession()
    setSession(currentSession)
    router.push('/')
  }

  const handleGoogleLogin = async () => {
    await googleSignIn()
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
    auth,
    setEmail,
    setPassword,
    handleLogin,
    handleGoogleLogin,
    handleSignUp,
    handleSignout,
  }
}
