// @flow
import React from 'react'
import { map } from 'lodash'

import Panel from '../../Panel'
import Button from '../../Button'
import AddIcon from '../../../assets/icons/contacts-add.svg'
import EditIcon from '../../../assets/icons/edit.svg'
import DeleteIcon from '../../../assets/icons/delete.svg'
import styles from './ContactsPanel.scss'

type Props = {
  contacts: {
    [name: string]: string
  },
  deleteContact: Function
}

export default class ContactsPanel extends React.Component<Props> {
  render () {
    return (
      <Panel className={styles.contactsPanel} renderHeader={this.renderHeader}>
        <div className={styles.contacts}>
          {map(this.props.contacts, this.renderContact)}
        </div>
      </Panel>
    )
  }

  renderHeader = () => {
    return (
      <div className={styles.header}>
        <span>Contacts</span>
        <span id='add' className={styles.addButton} onClick={this.handleAdd}>
          <AddIcon className={styles.addIcon} />
          <span>New Contact</span>
        </span>
      </div>
    )
  }

  renderContact = (address: string, name: string) => {
    return (
      <div key={address} className={styles.contact}>
        <div className={styles.details}>
          <div className={styles.name}>{name}</div>
          <div className={styles.address}>{address}</div>
        </div>
        <div className={styles.actions}>
          <Button
            className={styles.editButton}
            renderIcon={EditIcon}
            onClick={this.handleEdit}
          >
            Edit
          </Button>
          <Button
            className={styles.deleteButton}
            renderIcon={DeleteIcon}
            onClick={this.handleDelete(name)}
          >
            Delete Contact
          </Button>
        </div>
      </div>
    )
  }

  handleAdd = () => {
    // TODO
  }

  handleEdit = () => {
    // TODO
  }

  handleDelete = (name: string) => {
    return () => {
      if (window.confirm(`Are you sure you want to delete contact "${name}"?`)) {
        this.props.deleteContact(name)
      }
    }
  }
}
