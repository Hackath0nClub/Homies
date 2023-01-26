import { useState } from 'react'
import { selectProfileById } from '../infrastructure/profileRepository'

export type Profile = {
  id: string
  name: string
  text: string
  icon_url: string | null
  twitter_url: string | null
  soundcloud_url: string | null
  mixcloud_url: string | null
  create_at: Date | null
  updated_at: Date | null
}

export const useCounter = () => {
  const [count, setCount] = useState(1)
  const countUP = () => {
    setCount(count + 1)
  }
  return [count, countUP] as const
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>()

  async function getProfile(id: string) {
    const data = await selectProfileById(id)
    if (data) setProfile(data)
  }

  return [profile, getProfile] as const
}
