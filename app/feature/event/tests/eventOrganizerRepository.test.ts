import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectOrganizerByEventId } from '../infrastructure/eventOrganizerRepository'
// import { Lisners } from '../hooks/useLisner'
import organizer_json from './data/event_organizer.json'

const main = () => {
  selectOrganizerByEventIdTest({ id: 1, expected_result: organizer_data1 })
  selectOrganizerByEventIdTest({ id: 2, expected_result: organizer_data2 })
  selectOrganizerByEventIdTest({ id: 3, expected_result: organizer_data3 })
}

const organizer_data1 = convertDateStringToDateObjectInList(organizer_json[0])
const organizer_data2 = convertDateStringToDateObjectInList(organizer_json[1])
const organizer_data3 = convertDateStringToDateObjectInList(organizer_json[2])

type testCaseType = {
  id: number
  expected_result: any
}

const selectOrganizerByEventIdTest = ({
  id,
  expected_result,
}: testCaseType) => {
  test('selectOrganizerByEventId id=' + id, async () => {
    const result = await selectOrganizerByEventId(id)
    expect(result).toStrictEqual(expected_result)
  })
}

main()
