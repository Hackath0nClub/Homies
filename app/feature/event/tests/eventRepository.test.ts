import { selectEventById } from '../infrastructure/eventRepository'
import { Event } from '../hooks/useEvent'
import event_json from './data/event.json'

const main = () => {
  selectEventByIdTest({ id: 1, expected_result: event_data1 })
  selectEventByIdTest({ id: 2, expected_result: event_data2 })
  selectEventByIdTest({ id: 3, expected_result: event_data3 })
}

const convertDateStringToDateObject = (data: any) => {
  const { start_at, end_at, create_at, updated_at, ...others } = data
  const event: Event = {
    ...others,
    start_at: new Date(start_at),
    end_at: new Date(end_at),
    create_at: new Date(create_at),
    updated_at: new Date(updated_at),
  }
  return event
}

const event_data1 = convertDateStringToDateObject(event_json[0])
const event_data2 = convertDateStringToDateObject(event_json[1])
const event_data3 = convertDateStringToDateObject(event_json[2])

type testCaseType = {
  id: number
  expected_result: Event
}

const selectEventByIdTest = ({ id, expected_result }: testCaseType) => {
  test('selectEventById id=' + id, async () => {
    const result = await selectEventById(id)
    expect(result).toStrictEqual(expected_result)
  })
}

main()
