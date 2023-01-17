type propsType = {
  rootClassName: string
  title: string | null
  year: string | null
  date: string | null
}

const TitleRow = (props: propsType) => {
  return (
    <>
      <div className={`title-row-container ${props.rootClassName} `}>
        <div className="title-row-title-row">
          <div className="title-row-date-col">
            <span className="title-row-year-text">
              <span>{props.year}</span>
            </span>
            <span className="title-row-date-text">
              <span>{props.date}</span>
            </span>
          </div>
          <span className="title-row-title-text">
            <span>{props.title}</span>
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .title-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            margin-top: 2%;
            align-items: flex-start;
            margin-bottom: 2%;
            flex-direction: column;
          }
          .title-row-title-row {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
          }
          .title-row-date-col {
            display: flex;
            padding: 8px 12px 8px 0;
            position: relative;
            align-items: center;
            margin-right: 1%;
            flex-direction: column;
          }
          .title-row-year-text {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 20px;
            align-self: auto;
            font-style: DemiLight;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: 100%;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0px;
            text-decoration: none;
          }
          .title-row-date-text {
            color: rgba(255, 255, 255, 1);
            height: auto;
            font-size: 26px;
            align-self: auto;
            font-style: DemiLight;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 400;
            line-height: 100%;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0;
            text-decoration: none;
          }
          .title-row-title-text {
            color: rgba(255, 255, 255, 1);
            height: auto;
            flex-grow: 1;
            font-size: 26px;
            align-self: auto;
            font-style: Bold;
            text-align: left;
            font-family: Noto Sans JP;
            font-weight: 700;
            line-height: normal;
            font-stretch: normal;
            margin-right: 0;
            margin-bottom: 0;
            text-decoration: none;
          }
          .title-row-root-class-name {
            height: auto;
          }
        `}
      </style>
    </>
  )
}

export default TitleRow
