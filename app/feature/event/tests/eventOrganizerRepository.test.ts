import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectOrganizersByEventId } from '../infrastructure/eventOrganizerRepository'
// import { Lisners } from '../hooks/useLisner'
import organizer_json from './data/event_organizer.json'

const main = () => {
  selectOrganizersByEventIdTest({ id: 1, expected_result: organizer_data1 })
  selectOrganizersByEventIdTest({ id: 2, expected_result: organizer_data2 })
  selectOrganizersByEventIdTest({ id: 3, expected_result: organizer_data3 })
}

const organizer_data1 = convertDateStringToDateObjectInList(organizer_json[0])
const organizer_data2 = convertDateStringToDateObjectInList(organizer_json[1])
const organizer_data3 = convertDateStringToDateObjectInList(organizer_json[2])

type testCaseType = {
  id: number
  expected_result: any
}

const selectOrganizersByEventIdTest = ({
  id,
  expected_result,
}: testCaseType) => {
  test('selectOrganizersByEventId id=' + id, async () => {
    const result = await selectOrganizersByEventId(id)
    expect(result).toStrictEqual(expected_result)
  })
}

main()
