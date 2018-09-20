import React from 'react'

import lightLogo from '../../assets/images/alternate-logo-light-2.png'
import styles from './LogoWithStrikethrough.scss'

export default class LogoWithStrikethrough extends React.Component {
  render() {
    return (
      <div className={styles.logoWithStrikethroughContainer}>
        <div className={styles.strikethrough} />
        <img src={lightLogo} alt="" />
        <div className={styles.strikethrough} />
      </div>
    )
  }
}
