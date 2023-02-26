import { act, renderHook } from '@testing-library/react'
import { ChangeEvent } from 'react'
import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import timetable_json from './data/timetable.json'
import profile_json from './data/profile.json'
import * as profileDatabase from '../infrastructure/profileDatabase'

jest.mock('../infrastructure/profileDatabase')
const textSearchProfileByIdMock =
  profileDatabase.textSearchProfileById as jest.Mock

import { useSearchUser } from '../hooks/useSearchUser'

const data = {
  timetable: convertDateStringToDateObjectInList(timetable_json.data),
  profile: profile_json.data,
}

const { result } = renderHook(() => useSearchUser(data.timetable))

beforeEach(() => {
  jest.clearAllMocks()
})

test('searchUser', async () => {
  // Arrange
  textSearchProfileByIdMock.mockImplementation(() => data.profile)
  jest.useFakeTimers()
  const e = { target: { value: 'user-b' } } as ChangeEvent<HTMLInputElement>

  // Act
  act(() => result.current.handleSearch.handleInputChange(0, e))
  await act(() => jest.runAllTimers())

  // Assert
  expect(textSearchProfileByIdMock).toBeCalledWith('user-b')
  expect(result.current.search.results[0]).toStrictEqual(data.profile)
})

afterEach(() => {
  jest.restoreAllMocks()
})
