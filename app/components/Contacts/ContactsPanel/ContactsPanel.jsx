// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { map, isEmpty } from 'lodash-es'

import HeaderBar from '../../HeaderBar'
import Panel from '../../Panel'
import Button from '../../Button'
import AddIcon from '../../../assets/icons/add.svg'
import InfoIcon from '../../../assets/icons/info.svg'
import EditIcon from '../../../assets/icons/edit.svg'
import SendIcon from '../../../assets/icons/send.svg'
import { ROUTES } from '../../../core/constants'
import CopyToClipboard from '../../CopyToClipboard'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'

import styles from './ContactsPanel.scss'

type Props = {
  history: Object,
  contacts: {
    [name: string]: string
  },
  deleteContact: Function
}

export default class ContactsPanel extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HeaderBar
          label="Manage Contacts"
          shouldRenderRefresh={false}
          renderRightContent={() => (
            <Link id="add" className={styles.addButton} to={ROUTES.ADD_CONTACT}>
              <AddIcon className={styles.addIcon} />
              <span>New Contact</span>
            </Link>
          )}
        />
        <Panel
          className={styles.contactsPanel}
          renderHeader={this.renderHeader}
        >
          {!isEmpty(this.props.contacts) && (
            <div className={styles.contacts}>
              {map(this.props.contacts, this.renderContact)}
            </div>
          )}
          {isEmpty(this.props.contacts) && (
            <div className={styles.emptyContactsContainer}>
              <LogoWithStrikethrough />
            </div>
          )}
        </Panel>
      </React.Fragment>
    )
  }

  renderHeader = () => (
    <div className={styles.header}>
      <span>Contacts</span>
    </div>
  )

  renderContact = (address: string, name: string) => (
    <div key={name} className={styles.contact}>
      <div className={styles.name}>{name}</div>
      <div className={styles.address}>
        {address}{' '}
        <CopyToClipboard
          className={styles.copy}
          text={address}
          tooltip="Copy Public Address"
        />
      </div>
      <div className={styles.actions}>
        <Button
          className={styles.editButton}
          renderIcon={EditIcon}
          onClick={this.handleEdit(name)}
        >
          Edit
        </Button>
        <Button
          className={styles.infoButton}
          renderIcon={InfoIcon}
          onClick={this.handleEdit(name)}
        >
          View Activity
        </Button>
        <Button
          className={styles.sendButton}
          renderIcon={SendIcon}
          onClick={this.handleEdit(name)}
        >
          Send Assets
        </Button>
      </div>
    </div>
  )

  handleEdit = (name: string) => () => {
    this.props.history.push(`/contacts/edit/${encodeURIComponent(name)}`)
  }

  handleDelete = (name: string) => () => {
    if (window.confirm(`Are you sure you want to delete contact "${name}"?`)) {
      this.props.deleteContact(name)
    }
  }
}
