import { Session } from '@supabase/supabase-js'
import { atom } from 'recoil'

export const sessionState = atom<Session | null | undefined>({
  key: 'session',
  default: undefined,
})

const authInitial = {
  id: '',
  name: '',
  icon_url: '',
}
export type AuthType = Partial<typeof authInitial>
export const authState = atom<AuthType>({
  key: 'auth',
  default: authInitial,
})
