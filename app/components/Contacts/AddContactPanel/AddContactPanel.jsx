// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { noop } from 'lodash'

import Panel from '../../Panel'
import ContactForm from '../ContactForm'
import ArrowIcon from '../../../assets/icons/arrow.svg'
import { ROUTES } from '../../../core/constants'
import styles from './AddContactPanel.scss'

type Props = {
  className: ?string,
  name: string,
  address: string,
  onSave: Function
}

export default class AddContactPanel extends React.Component<Props> {
  static defaultProps = {
    name: '',
    address: '',
    setName: noop,
    setAddress: noop,
    onSave: noop
  }

  render () {
    const { className, name, address } = this.props

    return (
      <Panel
        className={classNames(styles.addContactPanel, className)}
        renderHeader={this.renderHeader}
      >
        <ContactForm name={name} address={address} onSubmit={this.handleSubmit} />
      </Panel>
    )
  }

  renderHeader = () => {
    return (
      <span className={styles.header}>
        <Link to={ROUTES.CONTACTS} className={styles.back}><ArrowIcon /></Link>
        <span>Add Contact</span>
      </span>
    )
  }

  handleSubmit = (name: string, address: string) => {
    this.props.onSave(name, address)
  }
}
