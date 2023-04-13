import { atom } from 'recoil'
import { utcToZonedTime } from 'date-fns-tz'

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
