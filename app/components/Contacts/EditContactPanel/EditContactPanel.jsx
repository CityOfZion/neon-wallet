// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { noop } from 'lodash-es'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import Panel from '../../Panel'
import ContactForm from '../ContactForm'
import ArrowIcon from '../../../assets/icons/arrow.svg'
import Close from '../../../assets/icons/close.svg'
import AddIcon from '../../../assets/icons/add.svg'
import BackButton from '../../BackButton'
import { ROUTES } from '../../../core/constants'
import styles from './EditContactPanel.scss'

type Props = {
  className: ?string,
  name: string,
  address: string,
  onSave: Function,
  deleteContact: Function
}

export default class EditContactPanel extends React.Component<Props> {
  static defaultProps = {
    name: '',
    address: '',
    setName: noop,
    setAddress: noop,
    onSave: noop
  }

  render() {
    const { className, name, address } = this.props

    return (
      <FullHeightPanel
        className={className}
        renderHeaderIcon={() => <AddIcon />}
        renderBackButton={() => <BackButton routeTo={ROUTES.CONTACTS} />}
        headerText="Edit A Contact"
        renderInstructions={() => (
          <div className={styles.editContactInstructions}>
            <div>Modify Details</div>
            <span onClick={this.handleDelete}>
              <Close /> Remove Contact
            </span>
          </div>
        )}
      >
        <div className={styles.formContainer}>
          <ContactForm
            formName={name}
            mode="edit"
            formAddress={address}
            onSubmit={this.handleSubmit}
          />
        </div>
      </FullHeightPanel>
    )
  }

  renderHeader = () => (
    <span className={styles.header}>
      <Link to={ROUTES.CONTACTS} className={styles.back}>
        <ArrowIcon />
      </Link>
      <span>Edit Contact</span>
    </span>
  )

  handleSubmit = (name: string, address: string) => {
    this.props.onSave(name, address)
  }

  handleDelete = () => {
    const { name } = this.props
    if (window.confirm(`Are you sure you want to delete contact "${name}"?`)) {
      this.props.deleteContact(name)
    }
  }
}
