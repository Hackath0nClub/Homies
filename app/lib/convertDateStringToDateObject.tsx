export const convertDateStringToDateObject = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const date = Date.parse(value)
    // 指定された文字列が yyyy-mm-ddThh:mm:ss.zzzZ フォーマットであるかチェック
    const dateRegExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
    // 指定された文字列が yyyy-mm-ddThh:mm:ss.zzzZ+00:00 フォーマットであるかチェック
    const timezoneRegExp =
      /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}/
    if (!dateRegExp.test(value) && !timezoneRegExp.test(value)) return
    // 文字列を Date 型の値に変換
    obj[key] = new Date(date)
  })
  return obj
}

export const convertDateStringToDateObjectInList = (obj: any[]) => {
  obj.forEach((object) => {
    convertDateStringToDateObject(object)
  })
  return obj
}
