import { useState } from 'react'
import { selectProfileById } from '../infrastructure/profileRepository'

export const useCounter = () => {
  const [count, setCount] = useState(1)
  const countUP = () => {
    setCount(count + 1)
  }
  return [count, countUP] as const
}

export const useProfile = () => {
  const [profile, setProfile] = useState<any>()

  async function getProfile(id: number) {
    const data = await selectProfileById(id)
    if (data) setProfile(data)
  }

  return [profile, getProfile] as const
}
