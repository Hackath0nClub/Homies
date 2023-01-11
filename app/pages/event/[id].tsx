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
import { useState, useEffect } from 'react'
import useEvent from '../../feature/event/hooks/useEvent'
import useTimeTable from '../../feature/event/hooks/useDjTimeTable'
// import useVjTable from '../../feature/event/hooks/useVjTimeTable'

// function
import { splitDateTime, splitDate } from '../../lib/splitDateTime'

const EventDetails = () => {
  const { query, isReady } = useRouter()
  const id = Number(query.id)
  const [event, getEvent, updateTitle] = useEvent()
  const [time_table, getTimeTable] = useTimeTable()
  // // VJテーブルを表示しようとするとエラーになる。ローカルスペックが貧弱？
  // const [vj_table, getVjTable] = useVjTable()
  const [start_date, setStartDateTime] = useState<splitDate>()
  const [end_date, setEndDateTime] = useState<splitDate>()

  useEffect(() => {
    const init = async () => {
      if (!isReady) return
      const data = await getEvent(id)
      if (!data || !data.start_at || !data.end_at) return
      const splited_start = splitDateTime(new Date(data.start_at))
      setStartDateTime(splited_start)
      const splited_end = splitDateTime(new Date(data.end_at))
      setEndDateTime(splited_end)
      getTimeTable(id)
      // getVjTable(id)
    }
    init()
  }, [isReady])

  return (
    <>
      {event && start_date && end_date && time_table && (
        <div className="event-details-container">
          <Head>
            <title>EventDetails - DJEvent</title>
            <meta property="og:title" content="EventDetails - DJEvent" />
          </Head>
          <div className="event-details-container1">
            <div className="event-details-main">
              <TitleRow
                rootClassName="title-row-root-class-name"
                title={event.title!}
                year={start_date.year}
                date={start_date.monthday}
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
                timetable={time_table}
              ></DjTimeTableRow>
              {/* <VjTimeTableRow
                rootClassName="v-j-timetable-row-root-class-name"
                timetable={vj_table}
              ></VjTimeTableRow> */}
              <DjButton rootClassName="d-j-button-root-class-name"></DjButton>
              <Bar rootClassName="bar-root-class-name2"></Bar>
              <GuestRow
                rootClassName="guest-row-root-class-name"
                timetable={time_table}
              ></GuestRow>
            </div>
            <div className="event-details-side">
              <EventItemsRow
                rootClassName="event-items-row-root-class-name"
                price={event.price}
                capacity={event.capacity}
                date={
                  start_date.year +
                  '/' +
                  start_date.monthday +
                  ' ' +
                  start_date.weekday
                }
                start_time={start_date.time}
                end_time={end_date.time}
                location_name={event.location_name}
                location_url={event.location_url}
                note={event.note}
              ></EventItemsRow>
              <OrganizerRow rootClassName="organizer-row-root-class-name"></OrganizerRow>
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
