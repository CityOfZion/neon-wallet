// @flow
import React from 'react'
import Arrow from '../../assets/icons/arrow.svg'
import styles from '../Button/Button.scss'
import { Link } from 'react-router-dom'

type Props = {
  className: ?string,
  routeTo: string
}

export default class BackButton extends React.Component<Props> {
  render = () => {
    const { routeTo } = this.props
    return (
      <Link to={routeTo}>
        <span className={this.props.className}>
          <Arrow className={styles.icon} />
        </span>
      </Link>
    )
  }
}
