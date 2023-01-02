import React from 'react'
import PropTypes from 'prop-types'
import styles from './header.module.css'

const Header = (props: any) => {
  return (
    <div className={` ${styles['container']} ${styles[props.rootClassName]} `}>
      <header data-role="Header" className={styles['header']}>
        <img
          alt="pastedImage"
          src="/playground_assets/homies-logo.png"
          className={styles['icon']}
        />
        <div className={styles['nav']}>
          <span className={styles['home']}>Home</span>
          <span className={styles['events']}>Events</span>
          <span className={styles['tickets']}>Tickets</span>
        </div>
        <img
          alt="pastedImage"
          src="/playground_assets/user-icon-sample.png"
          className={styles['user-icon']}
        />
      </header>
    </div>
  )
}

Header.defaultProps = {
  rootClassName: '',
}

Header.propTypes = {
  rootClassName: PropTypes.string,
}

export default Header
