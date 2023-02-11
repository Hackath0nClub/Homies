import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectOrganizersByEventId } from '../infrastructure/eventOrganizerDatabase'
import organizer_json from './data/event_organizer.json'

const organizer_data = convertDateStringToDateObjectInList(organizer_json.data)

test('selectOrganizersByEventId id=1', async () => {
  const result = await selectOrganizersByEventId(1)
  expect(result).toStrictEqual(organizer_data)
})
