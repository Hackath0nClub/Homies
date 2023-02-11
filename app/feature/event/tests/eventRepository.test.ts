import { convertDateStringToDateObject } from '../../../lib/convertDateStringToDateObject'
import {
  selectEventById,
  updateEventData,
} from '../infrastructure/eventRepository'
import event_json from './data/event.json'

const event_data = convertDateStringToDateObject(event_json.data)
const update_data = convertDateStringToDateObject(event_json.update)

test('selectEventById id=1', async () => {
  // Act
  const result = await selectEventById(1)
  // Assert
  expect(result).toStrictEqual(event_data)
})

test('updateEventData id=1', async () => {
  // Act
  await updateEventData(update_data)
  // Assert
  const result = await selectEventById(1)
  expect(result).toStrictEqual(update_data)
})

test('reverseEventData id=1', async () => {
  // Act
  await updateEventData(event_data)
  // Assert
  const result = await selectEventById(1)
  expect(result).toStrictEqual(event_data)
})
