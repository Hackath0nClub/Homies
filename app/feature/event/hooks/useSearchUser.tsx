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
    },
  }
}

export type Search = {
  keywords: string[]
  results: Users[]
  isOpens: boolean[]
}

export type HandleSearch = {
  setKeywords: (keywords: string[]) => void
  setResults: (results: Users[]) => void
  setIsOpens: (isOpens: boolean[]) => void
  addEmptyTimetableRow: () => Dj[]
  selectUser: (index: number, user: User) => TimeTable
  handleInputChange: (
    index: number,
    value: ChangeEvent<HTMLInputElement>
  ) => void
}
