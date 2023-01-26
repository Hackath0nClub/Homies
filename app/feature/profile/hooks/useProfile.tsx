import { useState } from 'react'
import { selectProfileById } from '../infrastructure/profileRepository'

export type Profile =
  | {
      uuid: string
      id: string
      name: string | null
      icon_url: string | null
      text: string | null
      twitter_url: string | null
      soundcloud_url: string | null
      mixcloud_url: string | null
      create_at: Date | null
      updated_at: Date | null
    }
  | undefined

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>()

  async function getProfile(id: string) {
    const data = await selectProfileById(id)
    if (data) setProfile(data)
  }

  async function setProfileText(text: string) {
    // TODO
    const { error } = await upsertProfileById(text) // Supabaseを更新する
    if (error) return
    // TODO
    const data = {} // textを更新する
    setProfile(data)
  }

  return [profile, getProfile] as const
}
