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
export type Event = Partial<typeof EventbaseInitial>
export const atomEventBase = atom<Event>({
  key: 'base',
  default: EventbaseInitial,
})
