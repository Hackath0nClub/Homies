import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import {
  convertDateStringToDateObject,
  convertDateStringToDateObjectInList,
} from '../../../lib/convertDateStringToDateObject'
import event_json from './data/event.json'
import organizer_json from './data/event_organizer.json'
import * as eventRepository from '../infrastructure/eventRepository'
import * as eventOrganizerRepository from '../infrastructure/eventOrganizerRepository'

// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventRepository')
const selectEventByIdMock = eventRepository.selectEventById as jest.Mock

jest.mock('../infrastructure/eventOrganizerRepository')
const selectOrganizerByEventIdMock =
  eventOrganizerRepository.selectOrganizerByEventId as jest.Mock

import { useEvent, Event, Organizers } from '../hooks/useEvent'

let result: any
const main = () => {
  beforeEach(() => {
    result = renderHook(() => useEvent()).result
    selectEventByIdMock.mockClear()
    selectOrganizerByEventIdMock.mockClear()
  })

  getEventInit({ expected_result: undefined })
  loadEventTest({ id: 1, load_data: data1 })
  // loadEventTest({ id: 2, mock_output: data2, expected_result: data2 })
  // loadEventTest({ id: 3, mock_output: data3, expected_result: data3 })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

const data1 = {
  event: convertDateStringToDateObject(event_json[0]),
  organizers: convertDateStringToDateObjectInList(organizer_json[0]),
}

// const data1 = convertDateStringToDateObject(event_json[0])
// const data2 = convertDateStringToDateObject(event_json[1])
// const data3 = convertDateStringToDateObject(event_json[2])

type testCaseType = {
  id: number
  load_data: {
    event: Event
    organizers: Organizers
  }
}

const loadEventTest = ({ id, load_data }: testCaseType) => {
  test('loadEvent id=' + id, async () => {
    // モック関数に値をセット
    selectEventByIdMock.mockImplementation(() => load_data.event)
    selectOrganizerByEventIdMock.mockImplementation(() => load_data.organizers)
    // Action
    await act(() => result.current.loadEvent(id))
    // 検証
    expect(result.current.event).toStrictEqual(load_data.event)
    expect(result.current.organizers).toStrictEqual(load_data.organizers)
  })
}

const getEventInit = ({ expected_result }: { expected_result: undefined }) => {
  test('loadEvent init value', async () => {
    expect(result.current.event).toStrictEqual(expected_result)
  })
}

main()
