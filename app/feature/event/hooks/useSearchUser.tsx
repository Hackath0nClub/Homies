import { useState, useEffect, ChangeEvent, useRef } from 'react'
import { TimeTable, User, Users } from './useEvent'
import { textSearchProfileById } from '../infrastructure/profileDatabase'

export const useSearchUser = (timetable: TimeTable) => {
  const length = timetable.length
  const [keywords, setKeywords] = useState<string[]>(Array(length).fill(''))
  const [results, setResults] = useState<Users[]>(Array(length).fill([]))
  const [isOpens, setIsOpens] = useState<boolean[]>(Array(length).fill(false))
  const isFirstRender = useRef(false)

  useEffect(() => {
    if (isFirstRender.current) return
    const newKeywords = [...keywords]
    timetable.map((row, index) => {
      newKeywords[index] = row.user_id ?? ''
    })
    setKeywords(newKeywords)
    isFirstRender.current = true
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const newResults = [...results]
      keywords.map(async (inputValue, index) => {
        if (!inputValue) return null
        const users = await searchUser(inputValue)
        newResults[index] = users
      })
      setResults(newResults)
    }, 500) // 次の入力が0.5秒間ない場合に検索を実行
    return () => clearTimeout(timer)
  }, [keywords])

  const searchUser = async (keyword: string) => {
    const result = await textSearchProfileById(keyword)
    return result ?? []
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

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newKeywords = [...keywords]
    newKeywords[index] = e.target.value
    setKeywords(newKeywords)

    const newIsOpens = [...isOpens]
    newIsOpens[index] = true
    setIsOpens(newIsOpens)
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
  addEmptyTimetableRow: () => void
  selectUser: (index: number, user: User) => TimeTable
  handleInputChange: (
    index: number,
    value: ChangeEvent<HTMLInputElement>
  ) => void
}
