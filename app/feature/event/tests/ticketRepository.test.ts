import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectListenerByEventId } from '../infrastructure/ticketRepository'
import listener_json from './data/listener.json'

const listener_data = convertDateStringToDateObjectInList(listener_json.data)

test('selectlistenerByEventId id=1', async () => {
  const result = await selectListenerByEventId(1)
  expect(result).toStrictEqual(listener_data)
})
