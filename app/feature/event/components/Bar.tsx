import React from 'react'

import PropTypes from 'prop-types'

const Bar = (props: any) => {
  return (
    <>
      <div className={`bar-container ${props.rootClassName} `}>
        <div className="bar-bar"></div>
      </div>
      <style jsx>
        {`
          .bar-container {
            width: 100%;
            height: auto;
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .bar-bar {
            flex: 0 0 auto;
            width: 100%;
            height: 0px;
            display: flex;
            margin-top: 2%;
            align-items: flex-start;
            border-color: #5e5e5e;
            border-style: solid;
            border-width: 1px;
            margin-bottom: 2%;
            border-top-width: 2px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-bottom-width: 0px;
          }
          .bar-root-class-name {
            height: auto;
          }
        `}
      </style>
    </>
  )
}

Bar.defaultProps = {
  rootClassName: '',
}

Bar.propTypes = {
  rootClassName: PropTypes.string,
}

export default Bar
