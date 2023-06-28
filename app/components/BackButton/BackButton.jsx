// @flow
import React from 'react'
import { Box } from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import Arrow from '../../assets/icons/arrow.svg'
import styles from '../Button/Button.scss'

type Props = {
  className: ?string,
  routeTo: string,
  onClick?: Function,
}

export default class BackButton extends React.Component<Props> {
  render = () => {
    const { routeTo, onClick } = this.props
    return onClick ? (
      <Box className={this.props.className} onClick={onClick} cursor="pointer">
        <Arrow className={styles.icon} />
      </Box>
    ) : (
      <Link to={routeTo}>
        <span className={this.props.className}>
          <Arrow className={styles.icon} />
        </span>
      </Link>
    )
  }
}
