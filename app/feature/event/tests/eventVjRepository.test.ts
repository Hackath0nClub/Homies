import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'
import { VjTable } from '../hooks/useEvent'
import eventvj_json from './data/vjtable.json'

const main = () => {
  selectEventVjByEventIdTest({ id: 1, expected_result: eventvj_data1 })
  selectEventVjByEventIdTest({ id: 2, expected_result: eventvj_data2 })
  selectEventVjByEventIdTest({ id: 3, expected_result: eventvj_data3 })
}

const eventvj_data1 = convertDateStringToDateObjectInList(eventvj_json[0])
const eventvj_data2 = convertDateStringToDateObjectInList(eventvj_json[1])
const eventvj_data3 = convertDateStringToDateObjectInList(eventvj_json[2])

type testCaseType = {
  id: number
  expected_result: VjTable
}

const selectEventVjByEventIdTest = ({ id, expected_result }: testCaseType) => {
  test('selectEventVjByEventId id=' + id, async () => {
    const result = await selectEventVjByEventId(id)
    expect(result).toStrictEqual(expected_result)
  })
}

main()
