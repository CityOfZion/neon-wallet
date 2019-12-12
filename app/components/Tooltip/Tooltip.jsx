// @flow
import React from 'react'
import { Tooltip as Tippy } from 'react-tippy'

import styles from './styles.scss'

type Props = {
  position: 'top' | 'left' | 'right' | 'bottom',
  children: React$Node,
  style: string,
}

const Tooltip = ({ children, position = 'bottom', style, ...rest }: Props) => (
  <Tippy
    className={styles.tippy}
    arrow
    position={position}
    animation="fade"
    style={{ width: '5000px !important' }}
    {...rest}
  >
    {children}
  </Tippy>
)

export default Tooltip
