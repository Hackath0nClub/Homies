import React from 'react'
import Head from 'next/head'

// components
import TitleRow from '../../feature/event/components/TitleRow'
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
import { useTimeTable } from '../../feature/event/hooks/useDjTimeTable'
import { useVjTable } from '../../feature/event/hooks/useVjTimeTable'
import { useLisner } from '../../feature/event/hooks/useLisner'

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
  const { event, organizers, loadEvent } = useEvent()
  const { time_table, getTimeTable } = useTimeTable()
  const { vj_table, getVjTable } = useVjTable()
  const { lisners, getLisners } = useLisner()

  useEffect(() => {
    const init = async () => {
      if (!isReady) return
      loadEvent(id)
      getTimeTable(id)
      getVjTable(id)
      getLisners(id)
    }
    init()
  }, [isReady])

  return (
    <>
      {event && time_table && vj_table && lisners && organizers && (
        <div className="event-details-container">
          <Head>
            <title>EventDetails - DJEvent</title>
            <meta property="og:title" content="EventDetails - DJEvent" />
          </Head>
          <div className="event-details-container1">
            <div className="event-details-main">
              <TitleRow
                rootClassName="title-row-root-class-name"
                title={event.title}
                year={event.start_at ? getYear(event.start_at) : null}
                date={event.start_at ? getMonthDay(event.start_at) : null}
              ></TitleRow>
              <ImageRow
                rootClassName="image-row-root-class-name"
                alt={event.title!}
                src={event.image_url!}
              ></ImageRow>
              <Bar rootClassName="bar-root-class-name"></Bar>
              <DescriptionRow
                rootClassName="description-row-root-class-name"
                text={event.text!}
              ></DescriptionRow>
              <Bar rootClassName="bar-root-class-name1"></Bar>
              <DjTimeTableRow
                rootClassName="d-j-timetable-row-root-class-name"
                timetable={time_table.map(
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
                rootClassName="v-j-timetable-row-root-class-name"
                timetable={vj_table.map(
                  ({ start_time, end_time, ...others }) => {
                    return {
                      ...others,
                      start_time: getTime(start_time),
                      end_time: getTime(end_time),
                    }
                  }
                )}
              ></VjTimeTableRow>
              <DjButton rootClassName="d-j-button-root-class-name"></DjButton>
              <Bar rootClassName="bar-root-class-name2"></Bar>
              <GuestRow
                rootClassName="guest-row-root-class-name"
                timetable={[...time_table, ...vj_table].map(
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
            <div className="event-details-side">
              <EventItemsRow
                rootClassName="event-items-row-root-class-name"
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
              <OrganizerRow
                rootClassName="organizer-row-root-class-name"
                organizers={organizers}
              ></OrganizerRow>
              <span className="event-details-terms-text">
                <span>
                  <span>利用規約　プライバシーポリシー</span>
                  <br></br>
                  <span>@ 2022 Homies</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .event-details-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            background-color: rgba(27, 32, 37, 1);
          }
          .event-details-container1 {
            width: 100%;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-left: 10%;
            padding-right: 10%;
          }
          .event-details-main {
            flex: 2;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            padding-top: 2%;
            padding-left: 2%;
            padding-right: 2%;
            flex-direction: column;
            padding-bottom: 2%;
          }
          .event-details-side {
            flex: 1;
            width: auto;
            height: auto;
            display: flex;
            align-items: flex-start;
            padding-top: 2%;
            padding-left: 2%;
            padding-right: 2%;
            flex-direction: column;
            padding-bottom: 2%;
          }
          .event-details-terms-text {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 14px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0;
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}

export default EventDetails
