// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { map, isEmpty } from 'lodash-es'
import classNames from 'classnames'

import StyledReactSelect from '../../Inputs/StyledReactSelect/StyledReactSelect'
import HeaderBar from '../../HeaderBar'
import Address from '../../Blockchain/Address'
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

type State = {
  sorting: {
    label: string,
    value: string
  }
}

type SelectOption = {
  label: string,
  value: string
}

const SORTING_OPTIONS = [
  {
    label: 'Sorting A-Z',
    value: 'DESC'
  },
  {
    label: 'Sorting Z-A',
    value: 'ASC'
  }
]

export default class ContactsPanel extends React.Component<Props, State> {
  state = {
    sorting: SORTING_OPTIONS[0]
  }

  render() {
    const { contacts } = this.props
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
          contentClassName={styles.contactPanelContent}
        >
          {isEmpty(contacts) ? (
            <div className={styles.emptyContactsContainer}>
              <LogoWithStrikethrough />
            </div>
          ) : (
            <div className={styles.contacts}>
              {Object.keys(contacts).map((key, i) =>
                this.renderContact({ address: contacts[key], name: key }, i)
              )}
            </div>
          )}
        </Panel>
      </React.Fragment>
    )
  }

  renderHeader = () => {
    const { sorting } = this.state
    const { contacts } = this.props
    return (
      <div className={styles.headerSelect}>
        <StyledReactSelect
          disabled={isEmpty(contacts)}
          value={sorting}
          onChange={this.handleSort}
          options={SORTING_OPTIONS}
          isSearchable={false}
          hideHighlight
        />
      </div>
    )
  }

  renderContact = (contact: Object, i: number) => {
    const { name, address } = contact
    return (
      <div
        key={name}
        className={classNames(styles.contact, {
          [styles.oddNumberedRow]: i % 2 === 0
        })}
      >
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
            onClick={() => this.handleEdit(name)}
          >
            Edit
          </Button>
          <Address address={address} asWrapper>
            <Button className={styles.infoButton} renderIcon={InfoIcon}>
              View Activity
            </Button>
          </Address>
          <Link
            to={{
              pathname: ROUTES.SEND,
              state: { address }
            }}
            className={styles.settingsDonations}
          >
            <Button className={styles.sendButton} renderIcon={SendIcon}>
              Send Assets
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  handleSort = (option: SelectOption) => {
    this.setState({ sorting: option })
  }

  handleEdit = (name: string) => () => {
    this.props.history.push(`/contacts/edit/${encodeURIComponent(name)}`)
  }

  handleDelete = (name: string) => () => {
    if (window.confirm(`Are you sure you want to delete contact "${name}"?`)) {
      this.props.deleteContact(name)
    }
  }
}
