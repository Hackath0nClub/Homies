import { atom } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'

const EventbaseInitial = {
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
export type EventType = Partial<typeof EventbaseInitial>
export const eventBaseState = atom<EventType>({
  key: 'base',
  default: EventbaseInitial,
})

const OrganizerInitial = {
  user_id: '',
  name: '',
  icon_url: '',
  text: '',
}
export type OrganizerType = Partial<typeof OrganizerInitial>
export type OrganizersType = OrganizerType[]
export const organizersState = atom<OrganizersType>({
  key: 'organizers',
  default: [OrganizerInitial],
})

const DjInitial = {
  row_number: 0,
  user_id: '',
  name: '',
  text: '',
  icon_url: '',
  start_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  end_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
}
export type DjType = Partial<typeof DjInitial>
export type TimeTableType = DjType[]
export const timeTableState = atom<TimeTableType>({
  key: 'timetable',
  default: [DjInitial],
})

const VjInitial = {
  row_number: 0,
  user_id: '',
  name: '',
  text: '',
  icon_url: '',
  start_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
  end_time: utcToZonedTime(new Date(), 'Asia/Tokyo'),
}
export type VjType = Partial<typeof VjInitial>
export type VjTableType = VjType[]
export const vjTableState = atom<VjTableType>({
  key: 'vjtable',
  default: [VjInitial],
})

const ListenerInitial = {
  user_id: '',
  name: '',
  icon_url: '',
}
export type ListenerType = Partial<typeof ListenerInitial>
export type ListenersType = ListenerType[]
export const listenersState = atom<ListenersType>({
  key: 'listeners',
  default: [ListenerInitial],
})

export type Listener = {
  user_id: string
  name: string
  icon_url: string | null
}[]
