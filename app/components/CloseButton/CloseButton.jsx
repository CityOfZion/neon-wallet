// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Close from '../../assets/icons/close.svg'
import styles from '../Button/Button.scss'

type Props = {
  className: ?string,
  routeTo: string
}

export default class CloseButton extends React.Component<Props> {
  render = () => {
    const { routeTo } = this.props
    return (
      <Link to={routeTo}>
        <span className={this.props.className}>
          <Close className={styles.icon} />
        </span>
      </Link>
    )
  }
}
