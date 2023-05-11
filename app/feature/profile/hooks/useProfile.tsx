import { useRecoilState } from 'recoil'
import { profileState } from '../store/profileState'
import { selectProfileById, upsertProfileById } from '../infrastructure/profileRepository'
import { selectEventByUserId } from '../infrastructure/eventRepository'

export const useProfile = () => {
  const [profileBase, setProfileBase] = useRecoilState(profileState)

  async function getProfile(id: string) {
    const data = await selectProfileById(id)
    if (data) setProfileBase(data)
  }

  async function setProfileText(text: string | null, id: string) {
    const data = await upsertProfileById(text, id) // Supabaseを更新する
    if (data) setProfileBase(data)
  }

  async function getPerformanceEventByUserId(user_id: string) {
    const events = await selectEventByUserId(user_id)
  }

  return {
    profileBase,
    getProfile,
    setProfileText,
    getPerformanceEventByUserId
  } as const
}
