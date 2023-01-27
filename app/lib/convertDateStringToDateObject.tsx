export const convertDateStringToDateObject = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const date = Date.parse(value)
    // 指定された文字列が yyyy-mm-ddThh:mm:ss.zzzZ in ISO 8601 フォーマットであるかチェック
    const regExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
    if (!regExp.test(value)) return
    // 文字列を Date 型の値に変換
    obj[key] = new Date(date)
  })
  return obj
}

export const convertDateStringToDateObjectInList = (obj: any[]) => {
  // 配列内のオブジェクトを探索
  obj.forEach((object) => {
    Object.keys(object).forEach((key) => {
      const value = object[key]
      const date = Date.parse(value)
      // 指定された文字列が yyyy-mm-ddThh:mm:ss.zzzZ in ISO 8601 フォーマットであるかチェック
      const regExp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/
      if (regExp.test(value)) {
        // 文字列を Date 型の値に変換
        object[key] = new Date(date)
      }
    })
  })
  // 最終的に生成された配列をreturnする
  return obj
}
