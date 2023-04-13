import { useEffect } from 'react'
import { useRouter } from 'next/router'

// components
import { UpdateButton } from '../../../feature/event/components/edit/UpdateButton'
import { Bar } from '../../../feature/event/components/view/Bar'
import { DjButton } from '../../../feature/event/components/view/DjButton'
import { EditGuest } from '../../../feature/event/components/edit/EditGuest'
import { EditImageRow } from '../../../feature/event/components/edit/EditImage'
import { EditTitleRow } from '../../../feature/event/components/edit/EditTitle'
import { EditDescription } from '../../../feature/event/components/edit/EditDescription'
import { EditEventItemsRow } from '../../../feature/event/components/edit/EditEventItems'
import { EditDjTimeTable } from '../../../feature/event/components/edit/EditDjTimeTable'
import { EditVjTimeTable } from '../../../feature/event/components/edit/EditVjTimeTable'

// hooks
import { useEvent } from '../../../feature/event/hooks/useEvent'
import { useTimetable } from '../../../feature/event/hooks/useTimetable'

const EventDetailsEdit = () => {
  const { query, isReady } = useRouter()
  const { loadEvent } = useEvent()
  const { loadTimetable } = useTimetable()

  useEffect(() => {
    if (!isReady) return
    loadEvent(Number(query.id))
    loadTimetable(Number(query.id))
  }, [isReady])

  return (
    <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
      <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
        <div className="col-span-10">
          <UpdateButton />
        </div>
        <div className="md:col-span-6 mt-4">
          <EditTitleRow />
          <EditImageRow />
          <Bar />
          <EditDescription />
          <Bar />
          <EditDjTimeTable />
          <EditVjTimeTable />
          <DjButton />
          <Bar />
          <EditGuest />
        </div>
        <div className="md:col-span-4">
          <EditEventItemsRow />
        </div>
      </div>
    </div>
  )
}

export default EventDetailsEdit
