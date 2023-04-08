import React from 'react'

// components
import { Title } from '../../../feature/event/components/view/Title'
import ImageRow from '../../../feature/event/components/view/Image'
import Bar from '../../../feature/event/components/view/Bar'
import DescriptionRow from '../../../feature/event/components/view/Description'
import DjTimeTableRow from '../../../feature/event/components/view/DjTimeTable'
import VjTimeTableRow from '../../../feature/event/components/view/VjTimeTable'
import DjButton from '../../../feature/event/components/view/DjButton'
import Guest from '../../../feature/event/components/view/Guest'
import { EventItems } from '../../../feature/event/components/view/EventItems'
import OrganizerRow from '../../../feature/event/components/view/Organizer'

// hooks
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useEvent } from '../../../feature/event/hooks/useEvent'

// function
import { getTime } from '../../../lib/splitDateTime'

const EventDetails = () => {
  const { query, isReady } = useRouter()
  const id = Number(query.id)
  const { event, handleEvent } = useEvent()

  const init = async () => {
    if (!isReady) return
    handleEvent.loadEvent(id)
  }

  useEffect(() => {
    init()
  }, [isReady])

  return (
    <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
      <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
        <div className="md:col-span-6">
          <Title />
          {event.base && (
            <ImageRow alt={event.base.title!} src={event.base.image_url!} />
          )}
          <Bar />
          {event.base && <DescriptionRow text={event.base.text!} />}
          <Bar />
          {event.timetable && (
            <DjTimeTableRow
              timetable={event.timetable.map(
                ({ start_time, end_time, ...others }) => {
                  return {
                    ...others,
                    start_time: start_time ? getTime(start_time) : '',
                    end_time: end_time ? getTime(end_time) : '',
                  }
                }
              )}
            />
          )}
          {event.vjtable && (
            <VjTimeTableRow
              timetable={event.vjtable.map(
                ({ start_time, end_time, ...others }) => {
                  return {
                    ...others,
                    start_time: start_time ? getTime(start_time) : '',
                    end_time: end_time ? getTime(end_time) : '',
                  }
                }
              )}
            />
          )}
          <DjButton />
          <Bar />
          {/* {event.timetable && event.vjtable && (
            <Guest
              timetable={event.timetable}
              handleEvent={handleEvent}
            ></Guest>
          )} */}
        </div>
        <div className="md:col-span-4">
          <EventItems />
          {event.organizers && <OrganizerRow organizers={event.organizers} />}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
