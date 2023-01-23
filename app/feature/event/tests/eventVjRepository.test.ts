import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'
import { VjTable } from '../hooks/useVjTimeTable'
import eventvj_json from './data/event_vj.json'

const main = () => {
  selectEventVjByEventIdTest({ id: 1, expected_result: eventvj_data1 })
  selectEventVjByEventIdTest({ id: 2, expected_result: eventvj_data2 })
  selectEventVjByEventIdTest({ id: 3, expected_result: eventvj_data3 })
}

const convertDateStringToDateObject = (data: any[]) => {
  const timetable = data.map((row) => {
    let { dj, start_time, end_time, ...others } = row
    return {
      ...others,
      ...dj,
      start_time: start_time ? new Date(start_time) : null,
      end_time: end_time ? new Date(end_time) : null,
    }
  })
  return timetable
}

const eventvj_data1 = convertDateStringToDateObject(eventvj_json[0])
const eventvj_data2 = convertDateStringToDateObject(eventvj_json[1])
const eventvj_data3 = convertDateStringToDateObject(eventvj_json[2])

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
