import React, { useEffect, useState, useRef } from 'react'

// components
import Bar from '../../../feature/event/components/Bar'
import DjTimeTableRow from '../../../feature/event/components/DjTimeTableRow'
import VjTimeTableRow from '../../../feature/event/components/VjTimeTableRow'
import DjButton from '../../../feature/event/components/DjButton'
import GuestRow from '../../../feature/event/components/GuestRow'
import EventItemsRow from '../../../feature/event/components/EventItemsRow'
import OrganizerRow from '../../../feature/event/components/OrganizerRow'
import { EditImageRow } from '../../../feature/event/components/EditImageRow'
import { EditTitleRow } from '../../../feature/event/components/EditTitleRow'
import { EditDescriptionRow } from '../../../feature/event/components/EditDescriptionRow'

// hooks
import { useRouter } from 'next/router'
import { useEvent } from '../../../feature/event/hooks/useEvent'

// function
import { getFullDate, getTime } from '../../../lib/splitDateTime'

const EventDetails = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { query, isReady } = useRouter()
  const id = Number(query.id)
  const { event, handleEvent } = useEvent()

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const local_file = e.target.files?.[0]
    if (local_file) handleEvent.setFile(local_file)
  }

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
        <div className="col-span-10">
          <button
            className="px-4 py-2 mt-4 text-white transition-colors duration-300 border border-gray-200 bg-[rgba(28,32,37,1)] rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={handleEvent.updateEvent}
          >
            イベントページを更新
          </button>
        </div>
        <div className="md:col-span-6 mt-4">
          {event.base && (
            <EditTitleRow base={event.base} setBase={handleEvent.setBase} />
          )}
          {event.base && (
            <EditImageRow
              base={event.base}
              file={event.file}
              setBase={handleEvent.setBase}
              setFile={handleEvent.setFile}
            />
          )}
          <Bar />
          {event.base && (
            <EditDescriptionRow
              base={event.base}
              setBase={handleEvent.setBase}
            />
          )}
          <Bar />
          {event.timetable && (
            <DjTimeTableRow
              timetable={event.timetable.map(
                ({ start_time, end_time, ...others }) => {
                  return {
                    ...others,
                    start_time: getTime(start_time),
                    end_time: getTime(end_time),
                  }
                }
              )}
            ></DjTimeTableRow>
          )}
          {event.vjtable && (
            <VjTimeTableRow
              timetable={event.vjtable.map(
                ({ start_time, end_time, ...others }) => {
                  return {
                    ...others,
                    start_time: getTime(start_time),
                    end_time: getTime(end_time),
                  }
                }
              )}
            ></VjTimeTableRow>
          )}
          <DjButton />
          <Bar />
          {event.timetable && event.vjtable && (
            <GuestRow
              timetable={[...event.timetable, ...event.vjtable].map(
                ({ start_time, end_time, ...others }) => {
                  return {
                    ...others,
                    start_time: getTime(start_time),
                    end_time: getTime(end_time),
                  }
                }
              )}
            ></GuestRow>
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
            ></EventItemsRow>
          )}
          {event.organizers && (
            <OrganizerRow organizers={event.organizers}></OrganizerRow>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
