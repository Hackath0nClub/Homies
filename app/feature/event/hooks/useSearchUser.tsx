import { useState, useEffect, ChangeEvent } from 'react'
import { TimeTable, User, Users, Dj } from './useEvent'
import { textSearchProfileById } from '../infrastructure/profileDatabase'

export const useSearchUser = (timetable: TimeTable) => {
  const [keywords, setKeywords] = useState<string[]>([])
  const [results, setResults] = useState<Users[]>([])
  const [isOpens, setIsOpens] = useState<boolean[]>([])

  const setupSearchUser = async (inputTimetable: TimeTable) => {
    const length = inputTimetable.length
    setResults(Array(length).fill([]))
    setIsOpens(Array(length).fill(false))
    const newKeywords = inputTimetable.map((row) => row.user_id ?? '')
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

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.value)
    const newKeywords = [...keywords]
    newKeywords[index] = e.target.value
    setKeywords(newKeywords)

    const newIsOpens = [...isOpens]
    newIsOpens[index] = e.target.value == '' ? false : true
    setIsOpens(newIsOpens)
  }

  const addEmptyTimetableRow = () => {
    setKeywords([...keywords, ''])
    setResults([...results, []])
    setIsOpens([...isOpens, false])
    const newTimetable = [
      ...timetable,
      {
        row_number: timetable.length + 1,
        user_id: null,
        name: '',
        text: null,
        icon_url: null,
        start_time: null,
        end_time: null,
        guest_name: null,
        guest_text: null,
        guest_icon_url: null,
      },
    ]
    return newTimetable
  }

  const selectUser = (index: number, user: User) => {
    const newKeywords = [...keywords]
    const newIsOpens = [...isOpens]
    const newItems = [...timetable]

    newKeywords[index] = user.id
    newIsOpens[index] = false
    newItems[index] = { ...newItems[index], ...user }

    setKeywords(newKeywords)
    setIsOpens(newIsOpens)
    return newItems
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
      addEmptyTimetableRow,
      handleInputChange,
      selectUser,
      clearKeyword,
      deleteSearchUserRow,
      shiftUpSearchUserRow,
    },
  }
}

export type Search = {
  keywords: string[]
  results: Users[]
  isOpens: boolean[]
}

export type HandleSearch = {
  setupSearchUser: (timetable: TimeTable) => void
  setKeywords: (keywords: string[]) => void
  setResults: (results: Users[]) => void
  setIsOpens: (isOpens: boolean[]) => void
  addEmptyTimetableRow: () => Dj[]
  selectUser: (index: number, user: User) => TimeTable
  handleInputChange: (
    index: number,
    value: ChangeEvent<HTMLInputElement>
  ) => void
  clearKeyword: (index: number) => void
  deleteSearchUserRow: (index: number) => void
  shiftUpSearchUserRow: (index: number) => void
}
