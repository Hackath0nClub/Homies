export const getMonthDay = (datetime: Date) => {
  const month = datetime.getMonth() + 1
  const day = datetime.getDate()
  return `${month}/${day}`
}

export const getYear = (datetime: Date) => {
  return datetime.getFullYear().toString()
}

export const getFullDate = (datetime: Date) => {
  const year = datetime.getFullYear().toString()
  const month = datetime.getMonth() + 1
  const day = datetime.getDate()
  const weekday_num = datetime.getDay()
  const weekdays = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)']
  const weekday = weekdays[weekday_num]
  return year + '/' + `${month}/${day}` + ' ' + weekday
}

export const getTime = (datetime: Date) => {
  // padStart(2, '0') で 9:0 > 09:01 となるように0パディング
  const hours = datetime.getHours().toString().padStart(2, '0')
  const minutes = datetime.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}
