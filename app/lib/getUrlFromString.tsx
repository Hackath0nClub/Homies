export const getUrlFromString = (str: string) => {
  const startIndex = str.indexOf('src="') + 5
  const endIndex = str.indexOf('" width=')
  return str.substring(startIndex, endIndex)
}
