import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { renderHook } from '@testing-library/react'
import eventdj_json from './data/event_dj.json'
import { act } from 'react-dom/test-utils'
import * as eventDjRepository from '../infrastructure/eventDjRepository'
// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/eventDjRepository')
const selectEventDjByEventIdMock =
  eventDjRepository.selectEventDjByEventId as jest.Mock
import { useTimeTable, TimeTable } from '../hooks/useDjTimeTable'

let result: any
const main = () => {
  beforeEach(() => {
    result = renderHook(() => useTimeTable()).result
    selectEventDjByEventIdMock.mockClear()
  })

  getTimeTableInit({ expected_result: undefined })
  getTimeTableTest({ id: 1, mock_output: mock1, expected_result: data1 })
  getTimeTableTest({ id: 2, mock_output: mock2, expected_result: data2 })
  getTimeTableTest({ id: 3, mock_output: mock3, expected_result: data3 })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

const mock1 = convertDateStringToDateObjectInList(eventdj_json[0])
const mock2 = convertDateStringToDateObjectInList(eventdj_json[1])
const mock3 = convertDateStringToDateObjectInList(eventdj_json[2])
const data1 = convertDateStringToDateObjectInList(eventdj_json[0])
const data2 = convertDateStringToDateObjectInList(eventdj_json[1])
const data3 = convertDateStringToDateObjectInList(eventdj_json[2])

type testCaseType = {
  id: number
  mock_output: TimeTable
  expected_result: TimeTable
}

const getTimeTableTest = ({
  id,
  mock_output,
  expected_result,
}: testCaseType) => {
  test('getTimeTable id=' + id, async () => {
    selectEventDjByEventIdMock.mockImplementation(() => mock_output)
    await act(() => result.current.getTimeTable(id))
    expect(result.current.time_table).toStrictEqual(expected_result)
  })
}

const getTimeTableInit = ({
  expected_result,
}: {
  expected_result: undefined
}) => {
  test('getTimeTable init value', async () => {
    expect(result.current.time_table).toStrictEqual(expected_result)
  })
}

main()
