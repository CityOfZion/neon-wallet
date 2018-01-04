// @flow
import React from 'react'

import { Tooltip as Tippy } from 'react-tippy'

type Props = {
  position: 'top' | 'left' | 'right' | 'bottom',
  children: React$Node
}

const Tooltip = ({ children, position = 'bottom', ...rest }: Props) =>
  <Tippy
    arrow
    position={position}
    animation='fade'
    {...rest}
  >
    {children}
  </Tippy>

export default Tooltip
