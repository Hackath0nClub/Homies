import { textSearchProfileById } from '../infrastructure/profileDatabase'
import profile_json from './data/profile.json'

const profile_data = profile_json.data

test('textSearchProfileById', async () => {
  // Act
  const result = await textSearchProfileById('user-b')
  // Assert
  expect(result).toStrictEqual(profile_data)
})
