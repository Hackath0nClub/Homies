import { atom } from "recoil";
import { utcToZonedTime } from 'date-fns-tz'

const profileDataInitial = {
  uuid: '',
  id: '',
  name: '',
  icon_url: '',
  text: '',
  twitter_url: '',
  soundcloud_url: '',
  mixcloud_url: '',
  create_at: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  updated_at: utcToZonedTime(new Date(), 'Asia/Tokyo'),
}

export type ProfileType = Partial<typeof profileDataInitial>
export const profileState = atom<ProfileType>({
  key: 'profileBase',
  default: profileDataInitial
})

const isEditUserText = false

// export type isEditUserTextType = Partial<typeof a>
export const editTextState = atom<boolean>({
  key: 'isEditText',
  default: isEditUserText
})