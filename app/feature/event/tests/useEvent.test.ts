import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
  convertDateStringToDateObject,
  convertDateStringToDateObjectInList,
} from '../../../lib/convertDateStringToDateObject'
import event_json from './data/event.json'
import organizer_json from './data/event_organizer.json'
import timetable_json from './data/timetable.json'
import vjtable_json from './data/vjtable.json'
import lisner_json from './data/listener.json'
import profile_json from './data/profile.json'
import * as eventDatabase from '../infrastructure/eventDatabase'
import * as eventOrganizerDatabase from '../infrastructure/eventOrganizerDatabase'
import * as eventDjDatabase from '../infrastructure/eventDjDatabase'
import * as eventVjDatabase from '../infrastructure/eventVjDatabase'
import * as ticketDatabase from '../infrastructure/ticketDatabase'
import * as profileDatabase from '../infrastructure/profileDatabase'

// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventDatabase')
const selectEventByIdMock = eventDatabase.selectEventById as jest.Mock
const updateEventDataMock = eventDatabase.updateEventData as jest.Mock

jest.mock('../infrastructure/eventOrganizerDatabase')
const selectOrganizersByEventIdMock =
  eventOrganizerDatabase.selectOrganizersByEventId as jest.Mock

jest.mock('../infrastructure/eventDjDatabase')
const selectEventDjByEventIdMock =
  eventDjDatabase.selectEventDjByEventId as jest.Mock

jest.mock('../infrastructure/eventVjDatabase')
const selectEventVjByEventIdMock =
  eventVjDatabase.selectEventVjByEventId as jest.Mock

jest.mock('../infrastructure/ticketDatabase')
const selectListenerByEventIdMock =
  ticketDatabase.selectListenerByEventId as jest.Mock

jest.mock('../infrastructure/profileDatabase')
const textSearchProfileByIdMock =
  profileDatabase.textSearchProfileById as jest.Mock

import { useEvent } from '../hooks/useEvent'

const data = {
  base: convertDateStringToDateObject(event_json.data),
  organizers: convertDateStringToDateObjectInList(organizer_json.data),
  timetable: convertDateStringToDateObjectInList(timetable_json.data),
  vjtable: convertDateStringToDateObjectInList(vjtable_json.data),
  listener: convertDateStringToDateObjectInList(lisner_json.data),
  profile: profile_json.data,
}

const update = {
  base: convertDateStringToDateObject(event_json.update),
}

let hook: any
beforeEach(() => {
  hook = renderHook(() => useEvent()).result
  jest.clearAllMocks()
})

test('loadEvent', async () => {
  // Arrange
  selectEventByIdMock.mockImplementation(() => data.base)
  selectOrganizersByEventIdMock.mockImplementation(() => data.organizers)
  selectEventDjByEventIdMock.mockImplementation(() => data.timetable)
  selectEventVjByEventIdMock.mockImplementation(() => data.vjtable)
  selectListenerByEventIdMock.mockImplementation(() => data.listener)

  // Act
  await act(() => hook.current.handleEvent.loadEvent(1))

  // Assert
  expect(hook.current.event.base).toStrictEqual(data.base)
  expect(hook.current.event.organizers).toStrictEqual(data.organizers)
  expect(hook.current.event.timetable).toStrictEqual(data.timetable)
  expect(hook.current.event.vjtable).toStrictEqual(data.vjtable)
  expect(hook.current.event.listener).toStrictEqual(data.listener)
})

test('updateEvent', async () => {
  // Arrange
  await act(() => hook.current.handleEvent.setBase(update.base))

  // Act
  await act(() => hook.current.handleEvent.updateEvent())

  // Assert
  expect(updateEventDataMock).toHaveBeenCalledTimes(1)
  expect(updateEventDataMock).toBeCalledWith(update.base)
})

test('searchUser', async () => {
  // Arrange
  textSearchProfileByIdMock.mockImplementation(() => data.profile)
  // Act
  const result = await act(() => hook.current.handleEvent.searchUser('user'))
  // Assert
  expect(result).toStrictEqual(data.profile)
  expect(textSearchProfileByIdMock).toBeCalledWith('user')
})

afterEach(() => {
  jest.restoreAllMocks()
})
