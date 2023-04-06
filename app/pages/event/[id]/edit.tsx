import React, { useEffect } from 'react'

// components
import Bar from '../../../feature/event/components/view/Bar'
import VjTimeTableRow from '../../../feature/event/components/view/VjTimeTable'
import DjButton from '../../../feature/event/components/view/DjButton'
import Guest from '../../../feature/event/components/edit/EditGuest'
import OrganizerRow from '../../../feature/event/components/view/Organizer'
import { EditImageRow } from '../../../feature/event/components/edit/EditImage'
import { EditTitleRow } from '../../../feature/event/components/edit/EditTitle'
import { EditDescriptionRow } from '../../../feature/event/components/edit/EditDescription'
import { EditEventItemsRow } from '../../../feature/event/components/edit/EditEventItems'
import { EditDjTimeTable } from '../../../feature/event/components/edit/EditDjTimeTable'
import { EditTimeTableRow } from '../../../feature/event/components/edit/EditTimeTableRow'

// hooks
import { useRouter } from 'next/router'
import { useEvent } from '../../../feature/event/hooks/useEvent'
import { useSearchUser } from '../../../feature/event/hooks/useSearchUser'

// function
import { getTime } from '../../../lib/splitDateTime'

const EventDetails = () => {
  const { query, isReady } = useRouter()
  const id = Number(query.id)
  const { event, handleEvent } = useEvent()
  const { search, handleSearch } = useSearchUser(event.timetable ?? [])

  const init = async () => {
    if (!isReady) return
    const initEvent = await handleEvent.loadEvent(id)
    if (!initEvent.timetable) return
    handleSearch.setupSearchUser(initEvent.timetable)
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
            <EditDjTimeTable
              handleEvent={handleEvent}
              handleSearch={handleSearch}
            >
              {event.timetable.map((row, index) => {
                return (
                  <div key={row.row_number}>
                    <EditTimeTableRow
                      row={row}
                      index={index}
                      search={search}
                      handleSearch={handleSearch}
                      handleEvent={handleEvent}
                    />
                  </div>
                )
              })}
            </EditDjTimeTable>
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
            ></VjTimeTableRow>
          )}
          <DjButton />
          <Bar />
          {event.timetable && event.vjtable && (
            <Guest
              timetable={event.timetable}
              handleEvent={handleEvent}
            ></Guest>
            // <Guest
            //   timetable={[...event.timetable, ...event.vjtable].map(
            //     ({ start_time, end_time, ...others }) => {
            //       return {
            //         ...others,
            //         start_time: start_time ? getTime(start_time) : '',
            //         end_time: end_time ? getTime(end_time) : '',
            //       }
            //     }
            //   )}
            // ></Guest>
          )}
        </div>
        <div className="md:col-span-4">
          {event.base && (
            <EditEventItemsRow
              base={event.base}
              setBase={handleEvent.setBase}
            />
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
