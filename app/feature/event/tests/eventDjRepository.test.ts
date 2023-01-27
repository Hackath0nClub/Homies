import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectEventDjByEventId } from '../infrastructure/eventDjRepository'
import { TimeTable } from '../hooks/useDjTimeTable'
import eventdj_json from './data/event_dj.json'

const main = () => {
  selectEventDjByEventIdTest({ id: 1, expected_result: eventdj_data1 })
  selectEventDjByEventIdTest({ id: 2, expected_result: eventdj_data2 })
  selectEventDjByEventIdTest({ id: 3, expected_result: eventdj_data3 })
}

const eventdj_data1 = convertDateStringToDateObjectInList(eventdj_json[0])
const eventdj_data2 = convertDateStringToDateObjectInList(eventdj_json[1])
const eventdj_data3 = convertDateStringToDateObjectInList(eventdj_json[2])

type testCaseType = {
  id: number
  expected_result: TimeTable
}

const selectEventDjByEventIdTest = ({ id, expected_result }: testCaseType) => {
  test('selectEventDjByEventId id=' + id, async () => {
    const result = await selectEventDjByEventId(id)
    expect(result).toStrictEqual(expected_result)
  })
}

main()
