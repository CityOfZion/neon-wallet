// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Close from '../../assets/icons/close.svg'
import styles from '../Button/Button.scss'

type Props = {
  className: ?string,
  routeTo: string,
  renderWithoutLink?: boolean,
  onClick: () => void,
}

export default class CloseButton extends React.Component<Props> {
  render = () => {
    const { routeTo, renderWithoutLink, onClick = () => null } = this.props
    return renderWithoutLink ? (
      <span className={this.props.className} onClick={onClick}>
        <Close className={styles.icon} />
      </span>
    ) : (
      <Link to={routeTo} onClick={onClick}>
        <span className={this.props.className}>
          <Close className={styles.icon} />
        </span>
      </Link>
    )
  }
}
