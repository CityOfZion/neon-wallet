import React from 'react'

import lightLogo from '../../assets/images/alternate-logo-light-2.png'
import darkLogo from '../../assets/images/alternate-logo-light-1.png'
import styles from './LogoWithStrikethrough.scss'

export default class LogoWithStrikethrough extends React.Component<Props> {
  render() {
    return (
      <div className={styles.logoWithStrikethroughContainer}>
        <div className={styles.strikethrough} />
        <img src={this.props.theme === 'Dark' ? lightLogo : darkLogo} alt="" />
        <div className={styles.strikethrough} />
      </div>
    )
  }
}
