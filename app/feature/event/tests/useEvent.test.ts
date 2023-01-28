import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
  convertDateStringToDateObject,
  convertDateStringToDateObjectInList,
} from '../../../lib/convertDateStringToDateObject'
import {
  Event,
  Organizers,
  TimeTable,
  VjTable,
  Lisners,
} from '../hooks/useEvent'
import event_json from './data/event.json'
import organizer_json from './data/event_organizer.json'
import timetable_json from './data/timetable.json'
import vjtable_json from './data/vjtable.json'
import lisner_json from './data/lisners.json'
import * as eventRepository from '../infrastructure/eventRepository'
import * as eventOrganizerRepository from '../infrastructure/eventOrganizerRepository'
import * as eventDjRepository from '../infrastructure/eventDjRepository'
import * as eventVjRepository from '../infrastructure/eventVjRepository'
import * as ticketRepository from '../infrastructure/ticketRepository'

// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventRepository')
const selectEventByIdMock = eventRepository.selectEventById as jest.Mock

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
const selectLisnersByEventIdMock =
  ticketRepository.selectLisnersByEventId as jest.Mock

import { useEvent } from '../hooks/useEvent'

let result: any
const main = () => {
  beforeEach(() => {
    result = renderHook(() => useEvent()).result
    jest.clearAllMocks()
  })

  getEventInit()
  loadEventTest({ id: 1, load_data: data1 })
  loadEventTest({ id: 2, load_data: data2 })
  loadEventTest({ id: 3, load_data: data3 })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

const data1 = {
  event: convertDateStringToDateObject(event_json[0]),
  organizers: convertDateStringToDateObjectInList(organizer_json[0]),
  timetable: convertDateStringToDateObjectInList(timetable_json[0]),
  vjtable: convertDateStringToDateObjectInList(vjtable_json[0]),
  lisners: convertDateStringToDateObjectInList(lisner_json[0]),
}

const data2 = {
  event: convertDateStringToDateObject(event_json[1]),
  organizers: convertDateStringToDateObjectInList(organizer_json[1]),
  timetable: convertDateStringToDateObjectInList(timetable_json[1]),
  vjtable: convertDateStringToDateObjectInList(vjtable_json[1]),
  lisners: convertDateStringToDateObjectInList(lisner_json[1]),
}

const data3 = {
  event: convertDateStringToDateObject(event_json[2]),
  organizers: convertDateStringToDateObjectInList(organizer_json[2]),
  timetable: convertDateStringToDateObjectInList(timetable_json[2]),
  vjtable: convertDateStringToDateObjectInList(vjtable_json[2]),
  lisners: convertDateStringToDateObjectInList(lisner_json[2]),
}

type testCaseType = {
  id: number
  load_data: {
    event: Event
    organizers: Organizers
    timetable: TimeTable
    vjtable: VjTable
    lisners: Lisners
  }
}

const loadEventTest = ({ id, load_data }: testCaseType) => {
  test('loadEvent id=' + id, async () => {
    // Arrange
    selectEventByIdMock.mockImplementation(() => load_data.event)
    selectOrganizersByEventIdMock.mockImplementation(() => load_data.organizers)
    selectEventDjByEventIdMock.mockImplementation(() => load_data.timetable)
    selectEventVjByEventIdMock.mockImplementation(() => load_data.vjtable)
    selectLisnersByEventIdMock.mockImplementation(() => load_data.lisners)

    // Act
    await act(() => result.current.loadEvent(id))

    // Assert
    expect(result.current.event).toStrictEqual(load_data.event)
    expect(result.current.organizers).toStrictEqual(load_data.organizers)
    expect(result.current.timetable).toStrictEqual(load_data.timetable)
    expect(result.current.vjtable).toStrictEqual(load_data.vjtable)
    expect(result.current.lisners).toStrictEqual(load_data.lisners)
  })
}

const getEventInit = () => {
  test('loadEvent init value', async () => {
    expect(result.current.event).toStrictEqual(undefined)
    expect(result.current.organizers).toStrictEqual(undefined)
    expect(result.current.timetable).toStrictEqual(undefined)
    expect(result.current.vjtable).toStrictEqual(undefined)
    expect(result.current.lisners).toStrictEqual(undefined)
  })
}

main()
