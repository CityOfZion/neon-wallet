// @flow
import React from 'react'
import type { Children } from 'react'
import { Tooltip as Tippy } from 'react-tippy'

type Props = {
  position: 'top' | 'left' | 'right' | 'bottom',
  children: Children
}

const Tooltip = ({ children, position = 'bottom', ...rest }: Props) =>
  <Tippy
    arrow
    position='bottom'
    animation='fade'
    {...rest}
  >
    {children}
  </Tippy>

export default Tooltip
