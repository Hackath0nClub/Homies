type propsType = {
  rootClassName: string
  timetable:
    | {
        row_number: number
        name: string | null
        user_id: string | null
        text: string | null
        icon_url: string | null
        start_time: string
        end_time: string
      }[]
}

const GuestRow = (props: propsType) => {
  return (
    <>
      <div className={`guest-row-container ${props.rootClassName} `}>
        <div className="guest-row-guest-row">
          <span className="guest-row-guest-title">
            <span>ゲストDJ</span>
          </span>
          <div className="guest-row-guest-details">
            {props.timetable.map((row) => {
              return (
                <div className="guest-row-d-j" key={row.row_number}>
                  <img
                    alt={row.name!}
                    src={row.icon_url!}
                    className="guest-row-d-j-image"
                  />
                  <span className="guest-row-d-j-name">
                    <span>{row.name}</span>
                  </span>
                  <span className="guest-row-d-j-text">
                    <span>
                      <span>{row.text}</span>
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .guest-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .guest-row-guest-row {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: flex-start;
            border-color: transparent;
            margin-bottom: 2%;
            flex-direction: column;
          }
          .guest-row-guest-title {
            color: rgba(255, 255, 255, 1);
            width: 100%;
            height: auto;
            font-size: 26px;
            align-self: auto;
            font-style: Bold;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 700;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 2%;
            text-decoration: none;
          }
          .guest-row-guest-details {
            gap: 4%;
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            flex-wrap: wrap;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: transparent;
            justify-content: flex-start;
          }
          .guest-row-d-j {
            width: 48%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-shrink: 0;
            border-color: transparent;
            margin-bottom: 4%;
            flex-direction: column;
          }
          .guest-row-d-j-image {
            width: 100%;
            height: auto;
            position: relative;
            align-self: stretch;
            border-color: transparent;
            margin-bottom: 1%;
          }
          .guest-row-d-j-name {
            color: rgba(255, 255, 255, 1);
            width: 100%;
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Bold;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 700;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 1%;
            text-decoration: none;
          }
          .guest-row-d-j-text {
            color: rgba(255, 255, 255, 1);
            width: 100%;
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
            white-space: pre-wrap; /* 改行を表示に反映させる */
          }
        `}
      </style>
    </>
  )
}

export default GuestRow
