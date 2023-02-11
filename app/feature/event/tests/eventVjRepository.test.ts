import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectEventVjByEventId } from '../infrastructure/eventVjRepository'
import eventvj_json from './data/vjtable.json'

const eventvj_data = convertDateStringToDateObjectInList(eventvj_json.data)

test('selectEventVjByEventId id=1', async () => {
  const result = await selectEventVjByEventId(1)
  expect(result).toStrictEqual(eventvj_data)
})
