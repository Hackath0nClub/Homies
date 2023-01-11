import React from 'react'

import PropTypes from 'prop-types'

const DJButton = (props: any) => {
  return (
    <>
      <div className={`d-j-button-container ${props.rootClassName} `}>
        <button className="d-j-button-d-j-button button">
          {props.DJButton}
        </button>
      </div>
      <style jsx>
        {`
          .d-j-button-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .d-j-button-d-j-button {
            color: rgb(255, 255, 255);
            font-size: 20px;
            font-style: normal;
            margin-top: 2%;
            font-weight: 600;
            padding-top: 2%;
            border-color: #ffffff;
            padding-left: 8%;
            border-radius: 36px;
            margin-bottom: 2%;
            padding-right: 8%;
            padding-bottom: 2%;
            background-image: linear-gradient(
              90deg,
              rgb(231, 112, 38) 0%,
              rgb(231, 189, 38) 100%
            );
          }
        `}
      </style>
    </>
  )
}

DJButton.defaultProps = {
  rootClassName: '',
  DJButton: 'DJ / VJ に申し込む',
}

DJButton.propTypes = {
  rootClassName: PropTypes.string,
  DJButton: PropTypes.string,
}

export default DJButton
