import { convertDateStringToDateObjectInList } from '../../../lib/convertDateStringToDateObject'
import { selectLisnersByEventId } from '../infrastructure/ticketRepository'
import { Lisners } from '../hooks/useLisner'
import lisners_json from './data/lisners.json'

const main = () => {
  selectLisnersByEventIdTest({ id: 1, expected_result: lisners_json1 })
  selectLisnersByEventIdTest({ id: 2, expected_result: lisners_json2 })
  selectLisnersByEventIdTest({ id: 3, expected_result: lisners_json3 })
}

const lisners_json1 = convertDateStringToDateObjectInList(lisners_json[0])
const lisners_json2 = convertDateStringToDateObjectInList(lisners_json[1])
const lisners_json3 = convertDateStringToDateObjectInList(lisners_json[2])

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
