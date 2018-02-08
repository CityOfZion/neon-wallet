// @flow
import React from 'react'
import classNames from 'classnames'

import NetworkSwitch from './Sidebar/NetworkSwitch'

import styles from './Footer.scss'

type Props = {
  className?: string
}

const Footer = ({ className }: Props) => {
  return (
    <div className={classNames(styles.footer, className)}>
      <NetworkSwitch />
    </div>
  )
}

export default Footer
