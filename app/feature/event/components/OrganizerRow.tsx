import React from 'react'

import PropTypes from 'prop-types'

const OrganizerRow = (props: any) => {
  return (
    <>
      <div className={`organizer-row-container ${props.rootClassName} `}>
        <div className="organizer-row-organizer-row">
          <span className="organizer-row-organizer-title">
            {props.OrganizerTitle}
          </span>
          <div className="organizer-row-s-n-s">
            <div className="organizer-row-organaizer">
              <img
                alt={props.OrganaizerIcon_alt}
                src={props.OrganaizerIcon_src}
                className="organizer-row-organaizer-icon"
              />
              <div className="organizer-row-s-n-s-name">
                <span className="organizer-row-s-n-s-name-text">
                  <span>{props.text}</span>
                </span>
                <span className="organizer-row-s-n-s-i-d-text">
                  <span>{props.text1}</span>
                </span>
              </div>
            </div>
            <button className="organizer-row-s-n-s-button button">
              <img
                alt={props.mditwitter_alt}
                src={props.mditwitter_src}
                className="organizer-row-mditwitter"
              />
              <span>{props.SNSText}</span>
            </button>
          </div>
          <div className="organizer-row-frame10">
            <div className="organizer-row-frame7">
              <span className="organizer-row-text2">
                <span>
                  <span>{props.text2}</span>
                  <br></br>
                  <span>{props.text3}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .organizer-row-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .organizer-row-organizer-row {
            width: 100%;
            display: flex;
            position: relative;
            align-self: stretch;
            align-items: flex-start;
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
          .organizer-row-organizer-title {
            color: rgb(255, 255, 255);
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
          .organizer-row-s-n-s {
            display: flex;
            padding: 12px 16px;
            position: relative;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
            margin-bottom: 0px;
          }
          .organizer-row-organaizer {
            display: flex;
            position: relative;
            align-items: center;
            border-color: transparent;
            margin-right: 16px;
          }
          .organizer-row-organaizer-icon {
            width: 48px;
            height: 48px;
            position: relative;
            border-color: transparent;
            margin-right: 12px;
            border-radius: 24px;
          }
          .organizer-row-s-n-s-name {
            display: flex;
            position: relative;
            align-items: flex-start;
            border-color: transparent;
            flex-direction: column;
          }
          .organizer-row-s-n-s-name-text {
            color: rgba(255, 255, 255, 1);
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
            margin-bottom: 0px;
            text-decoration: none;
          }
          .organizer-row-s-n-s-i-d-text {
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
          .organizer-row-s-n-s-button {
            width: 100%;
            display: flex;
            align-self: center;
            border-radius: 16px;
            flex-direction: row;
            justify-content: center;
          }
          .organizer-row-mditwitter {
            width: 20px;
            height: 20px;
            position: relative;
            margin-right: 4px;
          }
          .organizer-row-frame10 {
            display: flex;
            padding: 0 16px 16px 16px;
            position: relative;
            align-self: stretch;
            align-items: flex-start;
            border-color: transparent;
            flex-direction: column;
            justify-content: center;
          }
          .organizer-row-frame7 {
            display: flex;
            position: relative;
            align-self: stretch;
            align-items: center;
            flex-shrink: 0;
            border-color: transparent;
          }
          .organizer-row-text2 {
            color: rgba(166, 166, 166, 1);
            height: auto;
            flex-grow: 1;
            font-size: 16px;
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

OrganizerRow.defaultProps = {
  OrganizerTitle: '主催',
  rootClassName: '',
  text: 'ハッカソンDJ',
  text1: '@hackath0n_dj',
  text2:
    'ハッカソンDJだよ！ 音楽好きなプログラマーやデザイナーが集まって、DJアプリを作ってるよ。#ハッカソンDJ #プログラミング #デザイン #音楽好き #DJアプリ',
  mditwitter_src: '/playground_assets/mditwitter1032-blgd.svg',
  mditwitter_alt: 'mditwitter1032',
  text3: '',
  SNSText: 'フォロー',
  OrganaizerIcon_src: '/playground_assets/dalle20221203040621118-qqje-200h.png',
  OrganaizerIcon_alt: 'DALLE20221203040621118',
}

OrganizerRow.propTypes = {
  OrganizerTitle: PropTypes.string,
  rootClassName: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  mditwitter_src: PropTypes.string,
  mditwitter_alt: PropTypes.string,
  text3: PropTypes.string,
  SNSText: PropTypes.string,
  OrganaizerIcon_src: PropTypes.string,
  OrganaizerIcon_alt: PropTypes.string,
}

export default OrganizerRow
