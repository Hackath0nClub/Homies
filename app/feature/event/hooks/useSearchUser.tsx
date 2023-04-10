import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { keywordState, usersState } from '../store/eventState'
import { textSearchProfileById } from '../infrastructure/profileDatabase'

export const useSearchUser = () => {
  const [keyword, setKeyword] = useRecoilState(keywordState)
  const [results, setResults] = useRecoilState(usersState)

  useEffect(() => {
    const timer = setTimeout(searchUser, 500)
    return () => clearTimeout(timer)
  }, [keyword])

  const searchUser = async () => {
    if (keyword == '') return []
    const newResult = await textSearchProfileById(keyword)
    setResults(newResult ?? [])
  }

  const handleInputChange = (value: string) => {
    if (value == '') setResults([])
    setKeyword(value)
  }

  return {
    keyword,
    results,
    handleInputChange,
  }
}
