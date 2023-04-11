import React, { useEffect } from 'react'

// components
import { UpdateButton } from '../../../feature/event/components/edit/UpdateButton'
import { Bar } from '../../../feature/event/components/view/Bar'
import { VjTimeTable } from '../../../feature/event/components/view/VjTimeTable'
import { DjButton } from '../../../feature/event/components/view/DjButton'
import Guest from '../../../feature/event/components/edit/EditGuest'
import { Organizers } from '../../../feature/event/components/view/Organizers'
import { EditImageRow } from '../../../feature/event/components/edit/EditImage'
import { EditTitleRow } from '../../../feature/event/components/edit/EditTitle'
import { EditDescription } from '../../../feature/event/components/edit/EditDescription'
import { EditEventItemsRow } from '../../../feature/event/components/edit/EditEventItems'
import { EditDjTimeTable } from '../../../feature/event/components/edit/EditDjTimeTable'
import { EditTimeTableRow } from '../../../feature/event/components/edit/EditTimeTableRow'
import { EditVjTimeTable } from '../../../feature/event/components/edit/EditVjTimeTable'

// hooks
import { useRouter } from 'next/router'
import { useEvent } from '../../../feature/event/hooks/useEvent'
import { useSearchUser } from '../../../feature/event/hooks/useSearchUser'
import { useTimetable } from '../../../feature/event/hooks/useTimetable'

const EventDetails = () => {
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
          {/* {event.timetable && event.vjtable && (
            <Guest
              timetable={event.timetable}
              handleEvent={handleEvent}
            ></Guest>
            <Guest
              timetable={[...event.timetable, ...event.vjtable].map(
                ({ start_time, end_time, ...others }) => {
                  return {
                    ...others,
                    start_time: start_time ? getTime(start_time) : '',
                    end_time: end_time ? getTime(end_time) : '',
                  }
                }
              )}
            ></Guest>
          )} */}
        </div>
        <div className="md:col-span-4">
          {/* {event.base && (
            <EditEventItemsRow
              base={event.base}
              setBase={handleEvent.setBase}
            />
          )} */}
          {/* {event.organizers && (
            <Organizers organizers={event.organizers}></Organizers>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
