import { useState } from 'react'
import { Database } from '../utils/database.types'

type Event = Database['public']['Tables']['event']['Row']

import { selectEventById, UpdateEvent } from '../infrastructure/eventRepository'

const useEvent = () => {
  const [event, setEvent] = useState<Event>()

  async function getEvent(id: Event['id']): Promise<Event | undefined> {
    const data = await selectEventById(id)
    if (data) setEvent(data)
    return data
  }

  async function updateTitle(new_title: Event['title']) {
    let update = Object.assign({}, event)
    if (update == undefined) throw new Error('event is undefaind')
    update.title = new_title
    setEvent(update)
    UpdateEvent(update)
  }

  return [event, getEvent, updateTitle] as const
}

export default useEvent
