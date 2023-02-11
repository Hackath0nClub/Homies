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
import * as eventRepository from '../infrastructure/eventRepository'
import * as eventOrganizerRepository from '../infrastructure/eventOrganizerRepository'
import * as eventDjRepository from '../infrastructure/eventDjRepository'
import * as eventVjRepository from '../infrastructure/eventVjRepository'
import * as ticketRepository from '../infrastructure/ticketRepository'

// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventRepository')
const selectEventByIdMock = eventRepository.selectEventById as jest.Mock
const updateEventDataMock = eventRepository.updateEventData as jest.Mock

jest.mock('../infrastructure/eventOrganizerRepository')
const selectOrganizersByEventIdMock =
  eventOrganizerRepository.selectOrganizersByEventId as jest.Mock

jest.mock('../infrastructure/eventDjRepository')
const selectEventDjByEventIdMock =
  eventDjRepository.selectEventDjByEventId as jest.Mock

jest.mock('../infrastructure/eventVjRepository')
const selectEventVjByEventIdMock =
  eventVjRepository.selectEventVjByEventId as jest.Mock

jest.mock('../infrastructure/ticketRepository')
const selectListenerByEventIdMock =
  ticketRepository.selectListenerByEventId as jest.Mock

import { useEvent } from '../hooks/useEvent'

const data = {
  base: convertDateStringToDateObject(event_json.data),
  organizers: convertDateStringToDateObjectInList(organizer_json.data),
  timetable: convertDateStringToDateObjectInList(timetable_json.data),
  vjtable: convertDateStringToDateObjectInList(vjtable_json.data),
  listener: convertDateStringToDateObjectInList(lisner_json.data),
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

afterEach(() => {
  jest.restoreAllMocks()
})
