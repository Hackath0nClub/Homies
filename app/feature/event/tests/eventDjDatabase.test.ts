import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectEventDjByEventId } from '../infrastructure/eventDjDatabase'
import eventdj_json from './data/timetable.json'

const eventdj_data = convertDateStringToDateObjectInList(eventdj_json.data)

test('selectEventDjByEventId id=1', async () => {
  const result = await selectEventDjByEventId(1)
  expect(result).toStrictEqual(eventdj_data)
})
