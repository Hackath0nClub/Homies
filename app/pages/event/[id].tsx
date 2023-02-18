import React from 'react'

// components
import { TitleRow } from '../../feature/event/components/Title'
import ImageRow from '../../feature/event/components/Image'
import Bar from '../../feature/event/components/Bar'
import DescriptionRow from '../../feature/event/components/Description'
import DjTimeTableRow from '../../feature/event/components/DjTimeTable'
import VjTimeTableRow from '../../feature/event/components/VjTimeTable'
import DjButton from '../../feature/event/components/DjButton'
import GuestRow from '../../feature/event/components/Guest'
import EventItemsRow from '../../feature/event/components/EventItems'
import OrganizerRow from '../../feature/event/components/Organizer'

// hooks
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useEvent } from '../../feature/event/hooks/useEvent'

// function
import {
  getMonthDay,
  getYear,
  getFullDate,
  getTime,
} from '../../lib/splitDateTime'

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
          {event.base && (
            <TitleRow
              title={event.base.title}
              year={event.base.start_at ? getYear(event.base.start_at) : null}
              date={
                event.base.start_at ? getMonthDay(event.base.start_at) : null
              }
            />
          )}
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
          {event.timetable && event.vjtable && (
            <GuestRow
              timetable={[...event.timetable, ...event.vjtable].map(
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
        </div>
        <div className="md:col-span-4">
          {event.base && event.listener && (
            <EventItemsRow
              price={event.base.price}
              capacity={event.base.capacity}
              date={
                event.base.start_at ? getFullDate(event.base.start_at) : null
              }
              start_time={
                event.base.start_at ? getTime(event.base.start_at) : null
              }
              end_time={event.base.end_at ? getTime(event.base.end_at) : null}
              location_name={event.base.location_name}
              location_url={event.base.location_url}
              note={event.base.note}
              listener={event.listener.length}
            />
          )}
          {event.organizers && <OrganizerRow organizers={event.organizers} />}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
