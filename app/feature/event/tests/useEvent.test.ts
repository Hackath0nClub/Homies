import { convertDateStringToDateObject } from '../../../lib/convertDateStringToDateObject'
import { renderHook } from '@testing-library/react'
import event_json from './data/event.json'
import { act } from 'react-dom/test-utils'
import * as eventRepository from '../infrastructure/eventRepository'
// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventRepository')
const selectEventByIdMock = eventRepository.selectEventById as jest.Mock
import { useEvent, Event } from '../hooks/useEvent'

let result: any
const main = () => {
  beforeEach(() => {
    result = renderHook(() => useEvent()).result
    selectEventByIdMock.mockClear()
  })

  getEventInit({ expected_result: undefined })
  getEventTest({ id: 1, mock_output: mock1, expected_result: data1 })
  getEventTest({ id: 2, mock_output: mock2, expected_result: data2 })
  getEventTest({ id: 3, mock_output: mock3, expected_result: data3 })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

const mock1 = convertDateStringToDateObject(event_json[0])
const mock2 = convertDateStringToDateObject(event_json[1])
const mock3 = convertDateStringToDateObject(event_json[2])
const data1 = convertDateStringToDateObject(event_json[0])
const data2 = convertDateStringToDateObject(event_json[1])
const data3 = convertDateStringToDateObject(event_json[2])

type testCaseType = {
  id: number
  mock_output: Event
  expected_result: Event
}

const getEventTest = ({ id, mock_output, expected_result }: testCaseType) => {
  test('getEvent id=' + id, async () => {
    selectEventByIdMock.mockImplementation(() => mock_output)
    await act(() => result.current.getEvent(id))
    expect(result.current.event).toStrictEqual(expected_result)
  })
}

const getEventInit = ({ expected_result }: { expected_result: undefined }) => {
  test('getEvent init value', async () => {
    expect(result.current.event).toStrictEqual(expected_result)
  })
}

main()
