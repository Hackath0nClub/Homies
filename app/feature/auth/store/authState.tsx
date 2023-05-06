import { Session } from '@supabase/supabase-js'
import { atom } from 'recoil'

export const sessionState = atom<null | Session>({
  key: 'session',
  default: undefined,
})
