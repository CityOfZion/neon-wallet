// @flow
import React from 'react'
import Arrow from '../../assets/icons/arrow.svg'
import styles from '../Button/Button.scss'

type Props = {
  className: ?string,
  routeTo: string,
  history: {
    push: Function
  }
}

export default class BackButton extends React.Component<Props> {
  render = () => {
    return (
      <span className={this.props.className} onClick={this.handleClick}>
        <Arrow className={styles.icon} />
      </span>
    )
  }

  handleClick = () => {
    this.props.history.push(this.props.routeTo)
  }
}
