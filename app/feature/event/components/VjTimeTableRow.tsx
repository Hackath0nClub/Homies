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

const VjTimeTableRow = (props: propsType) => {
  return (
    <>
      <div className={`v-j-timetable-row-container ${props.rootClassName} `}>
        <div className="v-j-timetable-row-v-j-timetable">
          <span className="v-j-timetable-row-v-j-timetable-title">
            <span>VJテーブル</span>
          </span>

          {props.timetable.map((row) => {
            if (row.row_number % 2 == 1) {
              return (
                <div
                  className="v-j-timetable-row-v-j-timetable1"
                  key={row.row_number}
                >
                  <span className="v-j-timetable-row-titme-text">
                    <span>
                      {row.start_time} - {row.end_time}
                    </span>
                    <br></br>
                  </span>
                  <span className="v-j-timetable-row-v-j-text">{row.name}</span>
                </div>
              )
            } else if (row.row_number % 2 == 0) {
              return (
                <div
                  className="v-j-timetable-row-v-j-timetable2"
                  key={row.row_number}
                >
                  <span className="v-j-timetable-row-titme-text1">
                    <span>
                      {row.start_time} - {row.end_time}
                    </span>
                    <br></br>
                  </span>
                  <span className="v-j-timetable-row-v-j-text1">
                    {row.name}
                  </span>
                </div>
              )
            }
          })}
        </div>
      </div>
      <style jsx>
        {`
          .v-j-timetable-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .v-j-timetable-row-v-j-timetable {
            display: flex;
            position: relative;
            align-self: stretch;
            margin-top: 2%;
            align-items: center;
            border-color: transparent;
            margin-bottom: 2%;
            flex-direction: column;
          }
          .v-j-timetable-row-v-j-timetable-title {
            color: rgb(255, 255, 255);
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
          .v-j-timetable-row-v-j-timetable1 {
            width: 100%;
            display: flex;
            padding: 2%;
            position: relative;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 1);
            border-style: solid;
            border-width: Symbol(figma.mixed) px;
            margin-bottom: 0px;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(39, 39, 63, 1);
          }
          .v-j-timetable-row-titme-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: center;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0;
            text-decoration: none;
          }
          .v-j-timetable-row-v-j-text {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: center;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0;
            text-decoration: none;
          }
          .v-j-timetable-row-v-j-timetable2 {
            width: 100%;
            display: flex;
            padding: 2%;
            position: relative;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            border-color: rgba(255, 255, 255, 1);
            border-style: solid;
            border-width: Symbol(figma.mixed) px;
            margin-bottom: 0px;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(27, 28, 46, 1);
          }
          .v-j-timetable-row-titme-text1 {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: center;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0;
            text-decoration: none;
          }
          .v-j-timetable-row-v-j-text1 {
            color: rgb(255, 255, 255);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: Regular;
            text-align: center;
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

export default VjTimeTableRow
