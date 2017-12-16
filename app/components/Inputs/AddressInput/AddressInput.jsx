// @flow
import React from 'react'
import Delete from 'react-icons/lib/md/delete'
import { wallet } from 'neon-js'
import { noop, omit, map, values, trim } from 'lodash'

import SaveIcon from './SaveIcon'
import SelectInput from '../SelectInput'

import styles from './AddressInput.scss'

type Props = {
  value: string,
  addresses?: Object,
  loadAddresses?: Function,
  saveAddress?: Function,
  deleteAddress?: Function
}

export default class AddressInput extends React.Component<Props> {
  static defaultProps = {
    addresses: {},
    loadAddresses: noop,
    saveAddress: noop,
    deleteAddress: noop
  }

  componentDidMount = () => {
    this.props.loadAddresses()
  }

  render = () => {
    const passDownProps = omit(this.props, 'addresses', 'loadAddresses', 'saveAddress', 'deleteAddress')

    return (
      <SelectInput
        {...passDownProps}
        className={styles.addressInput}
        items={this.getItems()}
        renderAfter={this.renderSaveIcon}
        renderItem={this.renderItem} />
    )
  }

  renderSaveIcon = () => {
    if (this.canSave()) {
      return <SaveIcon onSave={this.handleSave} />
    }
  }

  renderItem = (item, { onSelect }) => {
    return (
      <div className={styles.addressItem} key={item.label} tabIndex={0} onClick={onSelect}>
        <div className={styles.meta}>
          <div className={styles.label}>{item.label}</div>
          <div className={styles.value}>{item.value}</div>
        </div>
        <div className={styles.actions}>
          <Delete className={styles.deleteIcon} tabIndex={0} onClick={this.handleDelete(item)} />
        </div>
      </div>
    )
  }

  handleSave = (name) => {
    this.props.saveAddress(this.props.value, name)
  }

  handleDelete = (item) => {
    return (event) => {
      event.preventDefault()
      event.stopPropagation()
      this.props.deleteAddress(item.label)
    }
  }

  getItems = () => {
    return map(this.props.addresses, (address, name) => ({
      label: name,
      value: address
    }))
  }

  canSave = () => {
    const address = this.props.value
    const { addresses } = this.props

    return trim(address) !== '' && wallet.isAddress(address) && !values(addresses).includes(address)
  }
}
