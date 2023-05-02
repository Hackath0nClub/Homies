import { useState } from 'react'
import { selectProfileById, upsertProfileById } from '../infrastructure/profileRepository'
import { selectPerformanceEventByUserId } from '../infrastructure//eventRepository'
import { Event, Events } from '../../event/hooks/useEvent'

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
  const [events, setEvents] = useState<Events>()

  async function getProfile(id: string) {
    const data = await selectProfileById(id)
    if (data) setProfile(data)
  }

  async function setProfileText(text: string | null, id: string) {
    const data = await upsertProfileById(text, id) // Supabaseを更新する
    if (data) setProfile(data)
  }

  async function getPerformanceEventByUserId(user_id: string) {
    const events = await selectPerformanceEventByUserId(user_id)
    if (events) setEvents(events)
  }

  return {
    profileData: {
      profile,
      events
    },
    handleProfile: {
      getProfile,
      setProfileText,
      getPerformanceEventByUserId
    }
  } as const
}
