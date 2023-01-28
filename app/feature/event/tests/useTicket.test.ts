import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { renderHook } from '@testing-library/react'
import lisners_json from './data/lisners.json'
import { act } from 'react-dom/test-utils'
import * as ticketRepository from '../infrastructure/ticketRepository'
// 依存する関数をテスト対象のimportより先にモック化する
jest.mock('../infrastructure/ticketRepository')
const selectLisnersByEventIdMock =
  ticketRepository.selectLisnersByEventId as jest.Mock
import { useLisner, Lisners } from '../hooks/useLisner'

let result: any
const main = () => {
  beforeEach(() => {
    result = renderHook(() => useLisner()).result
    selectLisnersByEventIdMock.mockClear()
  })

  getLisnersInit({ expected_result: undefined })
  getLisnersTest({ id: 1, mock_output: mock1, expected_result: data1 })
  getLisnersTest({ id: 2, mock_output: mock2, expected_result: data2 })
  getLisnersTest({ id: 3, mock_output: mock3, expected_result: data3 })

  afterEach(() => {
    jest.restoreAllMocks()
  })
}

const mock1 = convertDateStringToDateObjectInList(lisners_json[0])
const mock2 = convertDateStringToDateObjectInList(lisners_json[1])
const mock3 = convertDateStringToDateObjectInList(lisners_json[2])
const data1 = convertDateStringToDateObjectInList(lisners_json[0])
const data2 = convertDateStringToDateObjectInList(lisners_json[1])
const data3 = convertDateStringToDateObjectInList(lisners_json[2])

type testCaseType = {
  id: number
  mock_output: Lisners
  expected_result: Lisners
}

const getLisnersTest = ({ id, mock_output, expected_result }: testCaseType) => {
  test('getLisners id=' + id, async () => {
    selectLisnersByEventIdMock.mockImplementation(() => mock_output)
    await act(() => result.current.getLisners(id))
    expect(result.current.lisners).toStrictEqual(expected_result)
  })
}

const getLisnersInit = ({
  expected_result,
}: {
  expected_result: undefined
}) => {
  test('getLisner init value', async () => {
    expect(result.current.lisners).toStrictEqual(expected_result)
  })
}

main()
