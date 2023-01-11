import TicketButton from './TicketButton'
import HorizontalRule from './Bar'

type propsType = {
  rootClassName: string
  price: number | null
  capacity: number | null
  date: string | null
  start_time: string | null
  end_time: string | null
  location_name: string | null
  location_url: string | null
  note: string | null
}

const EventItemsRow = (props: propsType) => {
  return (
    <>
      <div className={`event-items-row-container ${props.rootClassName} `}>
        <div className="event-items-row-event-items-row">
          <span className="event-items-row-ticket-title">
            <span>チケット購入</span>
          </span>
          <TicketButton rootClassName="ticket-button-root-class-name"></TicketButton>
          <div className="event-items-row-price-row">
            <div className="event-items-row-price-title">
              <div className="event-items-row-price-icon">
                <img
                  alt="ionticketoutline1031"
                  src="/playground_assets/ionticketoutline1031-67td.svg"
                  className="event-items-row-price-icon-image"
                />
              </div>
              <span className="event-items-row-price-title1">
                <span>料金(税金)</span>
              </span>
            </div>
            <span className="event-items-row-price-text">
              <span>￥{props.price}</span>
            </span>
          </div>
          <HorizontalRule rootClassName="bar-root-class-name3"></HorizontalRule>
          <div className="event-items-row-limit-row">
            <div className="event-items-row-limit-title">
              <div className="event-items-row-limit-icon">
                <img
                  alt="ionticketoutline1031"
                  src="/playground_assets/mdiaccountgroup1032-eah9.svg"
                  className="event-items-row-limit-icon-image"
                />
              </div>
              <span className="event-items-row-limit-title1">制限人数</span>
            </div>
            <span className="event-items-row-limit-text">
              10人 / {props.capacity}人
            </span>
          </div>
          <HorizontalRule rootClassName="bar-root-class-name3"></HorizontalRule>
          <div className="event-items-row-date-row">
            <div className="event-items-row-date-title">
              <div className="event-items-row-date-icon">
                <img
                  alt="ionticketoutline1031"
                  src="/playground_assets/materialsymbolscalendarmonth1032-h966.svg"
                  className="event-items-row-date-icon-image"
                />
              </div>
              <span className="event-items-row-date-title1">日程</span>
            </div>
            <span className="event-items-row-date-text">{props.date}</span>
          </div>
          <HorizontalRule rootClassName="bar-root-class-name3"></HorizontalRule>
          <div className="event-items-row-time-row">
            <div className="event-items-row-time-title">
              <div className="event-items-row-time-icon">
                <img
                  alt="ionticketoutline1031"
                  src="/playground_assets/icoutlineaccesstime1032-5mx.svg"
                  className="event-items-row-time-icon-image"
                />
              </div>
              <span className="event-items-row-time-title1">時間</span>
            </div>
            <span className="event-items-row-time-text">
              {props.start_time} ～ {props.end_time}
            </span>
          </div>
          <HorizontalRule rootClassName="bar-root-class-name3"></HorizontalRule>
          <div className="event-items-row-lcation-row">
            <div className="event-items-row-location-title">
              <div className="event-items-row-location-icon">
                <img
                  alt="ionticketoutline1031"
                  src="/playground_assets/mdimapmarker1032-nu2k.svg"
                  className="event-items-row-location-icon-image"
                />
              </div>
              <span className="event-items-row-location-title1">
                <span>会場</span>
                <br></br>
              </span>
            </div>
            <span className="event-items-row-location-text">
              {props.location_name}
            </span>
            <iframe src={props.location_url!}></iframe>
          </div>
          <HorizontalRule rootClassName="bar-root-class-name3"></HorizontalRule>
          <div className="event-items-row-note-row">
            <div className="event-items-row-note-title">
              <div className="event-items-row-note-icon">
                <img
                  alt="ionticketoutline1031"
                  src="/playground_assets/mdifiledocumentoutline1032-0n0h.svg"
                  className="event-items-row-note-icon-image"
                />
              </div>
              <span className="event-items-row-note-title1">
                <span>備考</span>
                <br></br>
              </span>
            </div>
            <span className="event-items-row-note-text">
              <span>{props.note}</span>
            </span>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .event-items-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .event-items-row-event-items-row {
            width: 100%;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            padding-top: 4%;
            border-color: rgba(190, 190, 190, 1);
            border-style: solid;
            border-width: 0.5px;
            border-radius: 12px;
            margin-bottom: 4%;
            flex-direction: column;
            padding-bottom: 4%;
            background-color: rgba(46, 51, 56, 1);
          }
          .event-items-row-ticket-title {
            color: rgba(255, 255, 255, 1);
            width: auto;
            height: auto;
            font-size: 26px;
            align-self: auto;
            font-style: normal;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 500;
            line-height: normal;
            margin-left: 4%;
            font-stretch: normal;
            margin-right: 4%;
            margin-bottom: 4%;
            text-decoration: none;
          }
          .event-items-row-price-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
            padding-left: 4%;
            margin-bottom: 2%;
            padding-right: 4%;
            justify-content: space-between;
          }
          .event-items-row-price-title {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
          }
          .event-items-row-price-icon {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            margin-right: 12px;
          }
          .event-items-row-price-icon-image {
            width: 32px;
            height: 32px;
            position: relative;
          }
          .event-items-row-price-title1 {
            color: rgba(166, 166, 166, 1);
            height: auto;
            font-size: 20px;
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
          .event-items-row-price-text {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .event-items-row-limit-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
            padding-left: 4%;
            margin-bottom: 2%;
            padding-right: 4%;
            justify-content: space-between;
          }
          .event-items-row-limit-title {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
          }
          .event-items-row-limit-icon {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            margin-right: 12px;
          }
          .event-items-row-limit-icon-image {
            width: 32px;
            height: 32px;
            position: relative;
          }
          .event-items-row-limit-title1 {
            color: rgb(166, 166, 166);
            height: auto;
            font-size: 20px;
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
          .event-items-row-limit-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .event-items-row-date-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
            padding-left: 4%;
            margin-bottom: 2%;
            padding-right: 4%;
            justify-content: space-between;
          }
          .event-items-row-date-title {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
          }
          .event-items-row-date-icon {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            margin-right: 12px;
          }
          .event-items-row-date-icon-image {
            width: 32px;
            height: 32px;
            position: relative;
          }
          .event-items-row-date-title1 {
            color: rgb(166, 166, 166);
            height: auto;
            font-size: 20px;
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
          .event-items-row-date-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .event-items-row-time-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
            padding-left: 4%;
            margin-bottom: 2%;
            padding-right: 4%;
            justify-content: space-between;
          }
          .event-items-row-time-title {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
          }
          .event-items-row-time-icon {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            margin-right: 12px;
          }
          .event-items-row-time-icon-image {
            width: 32px;
            height: 32px;
            position: relative;
          }
          .event-items-row-time-title1 {
            color: rgb(166, 166, 166);
            height: auto;
            font-size: 20px;
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
          .event-items-row-time-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            text-decoration: none;
          }
          .event-items-row-lcation-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: transparent;
            padding-left: 4%;
            margin-bottom: 2%;
            padding-right: 4%;
            flex-direction: column;
            justify-content: space-between;
          }
          .event-items-row-location-title {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
          }
          .event-items-row-location-icon {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            margin-right: 12px;
          }
          .event-items-row-location-icon-image {
            width: 32px;
            height: 32px;
            position: relative;
          }
          .event-items-row-location-title1 {
            color: rgb(166, 166, 166);
            height: auto;
            font-size: 20px;
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
          .event-items-row-location-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            margin-left: 44px;
            font-stretch: normal;
            text-decoration: none;
          }
          .event-items-row-map-image {
            width: 100%;
            height: auto;
            opacity: 0.22;
            position: relative;
            margin-top: 2%;
            border-color: rgba(231, 112, 38, 1);
            border-style: solid;
            border-width: 1px;
            margin-bottom: 2%;
          }
          .event-items-row-note-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: transparent;
            padding-left: 4%;
            margin-bottom: 2%;
            padding-right: 4%;
            flex-direction: column;
            justify-content: space-between;
          }
          .event-items-row-note-title {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
          }
          .event-items-row-note-icon {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            margin-right: 12px;
          }
          .event-items-row-note-icon-image {
            width: 32px;
            height: 32px;
            position: relative;
          }
          .event-items-row-note-title1 {
            color: rgb(166, 166, 166);
            height: auto;
            font-size: 20px;
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
          .event-items-row-note-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            margin-left: 44px;
            font-stretch: normal;
            text-decoration: none;
            white-space: pre-wrap; /* 改行を表示に反映させる */
          }
        `}
      </style>
    </>
  )
}

export default EventItemsRow
