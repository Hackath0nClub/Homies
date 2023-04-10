import { useRecoilState } from 'recoil'
import {
  eventBaseState,
  organizersState,
  listenersState,
  fileState,
} from '../store/eventState'
import {
  selectEventById,
  updateEventData,
} from '../infrastructure/eventDatabase'
import { selectOrganizersByEventId } from '../infrastructure/eventOrganizerDatabase'
import { selectListenerByEventId } from '../infrastructure/ticketDatabase'
import { uploadEventImage } from '../infrastructure/eventStrage'

export const useEvent = () => {
  const [base, setBase] = useRecoilState(eventBaseState)
  const [organizers, setOrganizers] = useRecoilState(organizersState)
  const [listener, setListener] = useRecoilState(listenersState)
  const [file, setFile] = useRecoilState(fileState)

  const loadEvent = async (id: number) => {
    const base_data = await selectEventById(id)
    if (base_data) setBase(base_data)

    const organizers_data = await selectOrganizersByEventId(id)
    if (organizers_data) setOrganizers(organizers_data)

    const listener_data = await selectListenerByEventId(id)
    if (listener_data) setListener(listener_data)

    return {
      data: base_data,
      organizers: organizers_data,
      listener: listener_data,
    } as const
  }

  const setTitle = (title: string) => setBase({ ...base, title: title })
  const setText = (text: string) => setBase({ ...base, text: text })
  const updateEvent = async () => {
    console.log(file)
    if (base && file) {
      const file_name = base.id + '.png'
      await uploadEventImage({ file_name: file_name, file: file })
    }
    if (base) await updateEventData(base)
  }

  return {
    base,
    organizers,
    listener,
    file,
    loadEvent,
    updateEvent,
    setTitle,
    setText,
    setFile,
  } as const
}
