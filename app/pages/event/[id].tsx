import React from 'react'
import Head from 'next/head'

// components
import { TitleRow } from '../../feature/event/components/TitleRow'
import ImageRow from '../../feature/event/components/ImageRow'
import Bar from '../../feature/event/components/Bar'
import DescriptionRow from '../../feature/event/components/DescriptionRow'
import DjTimeTableRow from '../../feature/event/components/DjTimeTableRow'
import VjTimeTableRow from '../../feature/event/components/VjTimeTableRow'
import DjButton from '../../feature/event/components/DjButton'
import GuestRow from '../../feature/event/components/GuestRow'
import EventItemsRow from '../../feature/event/components/EventItemsRow'
import OrganizerRow from '../../feature/event/components/OrganizerRow'

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
  const { event, organizers, timetable, vjtable, lisners, loadEvent } =
    useEvent()

  const init = async () => {
    if (!isReady) return
    loadEvent(id)
  }

  useEffect(() => {
    init()
  }, [isReady])

  return (
    <>
      <Head>
        <title>EventDetails - DJEvent</title>
        <meta property="og:title" content="EventDetails - DJEvent" />
      </Head>
      {event && timetable && vjtable && lisners && organizers && (
        <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
          <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
            <div className="md:col-span-6">
              <TitleRow
                title={event.title}
                year={event.start_at ? getYear(event.start_at) : null}
                date={event.start_at ? getMonthDay(event.start_at) : null}
              ></TitleRow>
              <ImageRow alt={event.title!} src={event.image_url!}></ImageRow>
              <Bar />
              <DescriptionRow text={event.text!}></DescriptionRow>
              <Bar />
              <DjTimeTableRow
                timetable={timetable.map(
                  ({ start_time, end_time, ...others }) => {
                    return {
                      ...others,
                      start_time: getTime(start_time),
                      end_time: getTime(end_time),
                    }
                  }
                )}
              ></DjTimeTableRow>
              <VjTimeTableRow
                timetable={vjtable.map(
                  ({ start_time, end_time, ...others }) => {
                    return {
                      ...others,
                      start_time: getTime(start_time),
                      end_time: getTime(end_time),
                    }
                  }
                )}
              ></VjTimeTableRow>
              <DjButton />
              <Bar />
              <GuestRow
                timetable={[...timetable, ...vjtable].map(
                  ({ start_time, end_time, ...others }) => {
                    return {
                      ...others,
                      start_time: getTime(start_time),
                      end_time: getTime(end_time),
                    }
                  }
                )}
              ></GuestRow>
            </div>
            <div className="md:col-span-4">
              <EventItemsRow
                price={event.price}
                capacity={event.capacity}
                date={event.start_at ? getFullDate(event.start_at) : null}
                start_time={event.start_at ? getTime(event.start_at) : null}
                end_time={event.end_at ? getTime(event.end_at) : null}
                location_name={event.location_name}
                location_url={event.location_url}
                note={event.note}
                lisners={lisners.length}
              ></EventItemsRow>
              <OrganizerRow organizers={organizers}></OrganizerRow>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventDetails
