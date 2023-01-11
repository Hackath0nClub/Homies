type propsType = {
  rootClassName: string
  text: string
}

const DescriptionRow = (props: propsType) => {
  return (
    <>
      <div className={`description-row-container ${props.rootClassName} `}>
        <div className="description-row-description-row">
          <span className="description-row-description-title">
            <span>イベント概要</span>
          </span>
          <span className="description-row-description-text">
            <span>{props.text}</span>
          </span>
        </div>
      </div>
      <style jsx>
        {`
          .description-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .description-row-description-row {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            margin-top: 2%;
            align-items: flex-start;
            margin-bottom: 2%;
            flex-direction: column;
          }
          .description-row-description-title {
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
          .description-row-description-text {
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

export default DescriptionRow
