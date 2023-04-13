export const convertDateStringToDateObject = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    // 指定された文字列が yyyy-mm-ddThh:mm:ss.zzzZ / yyyy-mm-ddThh:mm:ss.zzzZ+00:00 フォーマットであるかチェック
    const dateRegExp =
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})$/
    if (!dateRegExp.test(value)) return
    obj[key] = new Date(value)
  })
  return obj
}

export const convertDateStringToDateObjectInList = (obj: any[]) => {
  obj.forEach((object) => {
    convertDateStringToDateObject(object)
  })
  return obj
}
