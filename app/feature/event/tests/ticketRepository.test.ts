import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectLisnersByEventId } from '../infrastructure/ticketRepository'
import { Lisners } from '../hooks/useEvent'
import lisners_json from './data/lisners.json'

const main = () => {
  selectLisnersByEventIdTest({ id: 1, expected_result: lisners_data1 })
  selectLisnersByEventIdTest({ id: 2, expected_result: lisners_data2 })
  selectLisnersByEventIdTest({ id: 3, expected_result: lisners_data3 })
}

const lisners_data1 = convertDateStringToDateObjectInList(lisners_json[0])
const lisners_data2 = convertDateStringToDateObjectInList(lisners_json[1])
const lisners_data3 = convertDateStringToDateObjectInList(lisners_json[2])

type testCaseType = {
  id: number
  expected_result: Lisners
}

const selectLisnersByEventIdTest = ({ id, expected_result }: testCaseType) => {
  test('selectLisnersByEventId id=' + id, async () => {
    const result = await selectLisnersByEventId(id)
    expect(result).toStrictEqual(expected_result)
  })
}

main()
