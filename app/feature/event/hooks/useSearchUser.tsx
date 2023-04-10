import { useEffect, ChangeEvent } from 'react'
import { useRecoilState, useRecoilCallback, CallbackInterface } from 'recoil'
import {
  DjType,
  TimeTableType,
  UserType,
  UsersType,
  isOpenState,
  keywordState,
  timeTableState,
  usersState,
} from '../store/eventState'
import { textSearchProfileById } from '../infrastructure/profileDatabase'

export const useSearchUser = () => {
  const [timetable] = useRecoilState(timeTableState)
  const [keywords, setKeywords] = useRecoilState(keywordState)
  const [results, setResults] = useRecoilState(usersState)
  const [isOpens, setIsOpens] = useRecoilState(isOpenState)

  const setupSearchUser = async (inputTable: TimeTableType) => {
    if (!inputTable) return
    const length = inputTable.length
    const newKeywords = inputTable.map((dj) => dj.user_id ?? '')
    setResults(Array(length).fill([]))
    setIsOpens(Array(length).fill(false))
    setKeywords(newKeywords)
  }

  useEffect(() => {
    const timer = setTimeout(triggerSearchUser, 500)
    return () => clearTimeout(timer)
  }, [keywords])

  const triggerSearchUser = async () => {
    const newResults = await Promise.all(keywords.map(searchUser))
    setResults(newResults)
  }

  const searchUser = async (keyword: string) => {
    if (keyword == '') return []
    const result = await textSearchProfileById(keyword)
    return result ?? []
  }

  const handleInputChange = (index: number, value: string) => {
    const newKeywords = [...keywords]
    newKeywords[index] = value
    setKeywords(newKeywords)

    const newIsOpens = [...isOpens]
    newIsOpens[index] = value == '' ? false : true
    setIsOpens(newIsOpens)
  }

  const addEmptySearchUser = () => {
    setKeywords([...keywords, ''])
    setResults([...results, []])
    setIsOpens([...isOpens, false])
  }

  const selectUser = (index: number, user: UserType) => {
    const newKeywords = [...keywords]
    const newIsOpens = [...isOpens]
    const newTimetable = [...timetable]

    newKeywords[index] = user.id ?? ''
    newIsOpens[index] = false

    const newUser = {
      user_id: user.id,
      name: user.name,
      icon_url: user.icon_url,
      text: user.text,
    }

    newTimetable[index] = { ...newTimetable[index], ...newUser }

    setKeywords(newKeywords)
    setIsOpens(newIsOpens)
    return newTimetable
  }

  const clearKeyword = (index: number) => {
    const newKeywords = [...keywords]
    newKeywords[index] = ''
    setKeywords(newKeywords)
  }

  const deleteSearchUserRow = (index: number) => {
    const newKeywords = [...keywords]
    newKeywords.splice(index, 1)
    setKeywords(newKeywords)

    const newResults = [...results]
    newResults.splice(index, 1)
    setResults(newResults)

    const newIsOpens = [...isOpens]
    newIsOpens.splice(index, 1)
    setIsOpens(newIsOpens)
  }

  const shiftUpSearchUserRow = (index: number) => {
    if (index == 0) return
    let newKeywords = [...keywords]
    const targetKeyword = newKeywords[index]
    newKeywords[index] = newKeywords[index - 1]
    newKeywords[index - 1] = targetKeyword
    setKeywords(newKeywords)

    const newResults = [...results]
    const targetResult = newResults[index]
    newResults[index] = newResults[index - 1]
    newResults[index - 1] = targetResult
    setResults(newResults)

    const newIsOpens = [...isOpens]
    const targetIsOpen = newIsOpens[index]
    newIsOpens[index] = newIsOpens[index - 1]
    newIsOpens[index - 1] = targetIsOpen
    setIsOpens(newIsOpens)
  }

  return {
    keywords,
    results,
    isOpens,
    setupSearchUser,
    addEmptySearchUser,
    shiftUpSearchUserRow,
    handleInputChange,
    selectUser,
    clearKeyword,
    search: {
      keywords,
      results,
      isOpens,
    },
    handleSearch: {
      setupSearchUser,
      setKeywords,
      setResults,
      setIsOpens,
      // addEmptyTimetableRow,
      handleInputChange,
      selectUser,
      clearKeyword,
      deleteSearchUserRow,
      shiftUpSearchUserRow,
    },
  }
}
