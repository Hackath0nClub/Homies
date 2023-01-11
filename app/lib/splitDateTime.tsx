export type splitDate = {
  year: string
  monthday: string
  weekday: string
  time: string
}

export const splitDateTime = (datetime: Date): splitDate => {
  const year = datetime.getFullYear().toString()

  const month = datetime.getMonth() + 1
  const day = datetime.getDate()
  const monthday = `${month}/${day}`

  const weekday_num = datetime.getDay()
  const weekdays = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']
  const weekday = weekdays[weekday_num]

  // padStart(2, '0') で 9:0 > 09:01 となるように0パディング
  const hours = datetime.getHours().toString().padStart(2, '0')
  const minutes = datetime.getMinutes().toString().padStart(2, '0')
  const time = `${hours}:${minutes}`

  return { year, monthday, weekday, time }
}
