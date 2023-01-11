import React from 'react'

import PropTypes from 'prop-types'

const TicketButton = (props: any) => {
  return (
    <>
      <div className={`ticket-button-container ${props.rootClassName} `}>
        <button className="ticket-button-d-j-button button">
          {props.DJButton}
        </button>
      </div>
      <style jsx>
        {`
          .ticket-button-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: center;
            flex-direction: column;
          }
          .ticket-button-d-j-button {
            color: rgb(255, 255, 255);
            font-size: 20px;
            font-style: normal;
            margin-top: 2%;
            font-weight: 600;
            padding-top: 4%;
            border-color: #ffffff;
            padding-left: 12%;
            border-radius: 36px;
            margin-bottom: 2%;
            padding-right: 12%;
            padding-bottom: 4%;
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

TicketButton.defaultProps = {
  DJButton: 'チケット購入へ！',
  rootClassName: '',
}

TicketButton.propTypes = {
  DJButton: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default TicketButton
