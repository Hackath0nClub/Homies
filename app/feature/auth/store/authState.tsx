import { Session } from '@supabase/supabase-js'
import { atom } from 'recoil'

export const sessionState = atom<Session | null | undefined>({
  key: 'session',
  default: undefined,
})
