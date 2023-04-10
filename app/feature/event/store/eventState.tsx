import { atom } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'
import { type } from 'os'

const eventbaseInitial = {
  id: 0,
  title: '',
  text: '',
  start_at: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  end_at: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  capacity: 0,
  image_url: '',
  location_name: '',
  location_url: '',
  note: '',
  price: 0,
  publicly: false,
  create_at: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  updated_at: utcToZonedTime(new Date(), 'Asia/Tokyo'),
}
export type EventType = Partial<typeof eventbaseInitial>
export const eventBaseState = atom<EventType>({
  key: 'base',
  default: eventbaseInitial,
})

const organizerInitial = {
  user_id: '',
  name: '',
  icon_url: '',
  text: '',
}
export type OrganizerType = Partial<typeof organizerInitial>
export type OrganizersType = OrganizerType[]
export const organizersState = atom<OrganizersType>({
  key: 'organizers',
  default: [organizerInitial],
})

export const djInitial = {
  row_number: 0,
  user_id: '',
  name: '',
  text: '',
  icon_url: '',
  start_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  end_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
}
export type DjType = Partial<typeof djInitial>
export type TimeTableType = DjType[]
export const timeTableState = atom<TimeTableType>({
  key: 'timetable',
  default: [djInitial],
})

const vjInitial = {
  row_number: 0,
  user_id: '',
  name: '',
  text: '',
  icon_url: '',
  start_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  end_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
}
export type VjType = Partial<typeof vjInitial>
export type VjTableType = VjType[]
export const vjTableState = atom<VjTableType>({
  key: 'vjtable',
  default: [vjInitial],
})

const listenerInitial = {
  user_id: '',
  name: '',
  icon_url: '',
}
export type ListenerType = Partial<typeof listenerInitial>
export type ListenersType = ListenerType[]
export const listenersState = atom<ListenersType>({
  key: 'listeners',
  default: [listenerInitial],
})

export type Listener = {
  user_id: string
  name: string
  icon_url: string | null
}[]

export const fileState = atom<File | null>({
  key: 'file',
  default: null,
})

const userInitial = {
  id: '',
  name: '',
  icon_url: '',
  text: '',
}
export type UserType = Partial<typeof userInitial>
export type UsersType = UserType[]

export const keywordState = atom<string>({
  key: 'keyword',
  default: '',
})

export const usersState = atom<UsersType>({
  key: 'users',
  default: [],
})
