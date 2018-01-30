// @flow
import React from 'react'
import Sifter from 'sifter'
import Delete from 'react-icons/lib/md/delete'
import { wallet } from 'neon-js'
import { noop, omit, map, values, trim } from 'lodash'

import SaveIcon from './SaveIcon'
import SelectInput, { DropdownButton } from '../SelectInput'

import styles from './AddressInput.scss'

type ItemType = {
  label: string,
  value: string
}

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
    const { loadAddresses } = this.props
    if (loadAddresses) {
      loadAddresses()
    }
  }

  render = () => {
    const passDownProps = omit(this.props, 'addresses', 'loadAddresses', 'saveAddress', 'deleteAddress')

    return (
      <SelectInput
        {...passDownProps}
        className={styles.addressInput}
        items={this.getItems()}
        renderAfter={this.renderAfter}
        renderItem={this.renderItem}
        getItemValue={this.getItemValue}
        getSearchResults={this.getSearchResults} />
    )
  }

  renderAfter = (props: Props) => {
    if (this.canSave()) {
      return <SaveIcon id='saveIcon' onSave={this.handleSave} />
    } else {
      return <DropdownButton {...props} />
    }
  }

  renderItem = (item: ItemType, { onSelect }: { onSelect: Function }) => {
    return (
      <div className={styles.addressItem} key={item.label} tabIndex={0} onClick={onSelect}>
        <div className={styles.meta}>
          <div className={styles.label}>{item.label}</div>
          <div className={styles.value}>{item.value}</div>
        </div>
        <div className={styles.actions}>
          <Delete
            id={`deleteIcon${item.value}`}
            className={styles.deleteIcon}
            tabIndex={0}
            onClick={this.handleDelete(item)} />
        </div>
      </div>
    )
  }

  handleSave = (name: string) => {
    const { saveAddress, value } = this.props
    if (saveAddress) {
      saveAddress(value, name)
    }
  }

  handleDelete = (item: ItemType) => {
    return (event: Object) => {
      event.preventDefault()
      event.stopPropagation()
      const { deleteAddress } = this.props
      if (deleteAddress) {
        deleteAddress(item.label)
      }
    }
  }

  getItems = (): Array<ItemType> => {
    const { addresses } = this.props
    if (!addresses) {
      return []
    }
    return map(addresses, (address, name) => ({
      label: name,
      value: address
    }))
  }

  getItemValue = (item: ItemType): string => {
    return item.value
  }

  getSearchResults = (items: Array<ItemType>, term: string): Array<ItemType> => {
    const sifter = new Sifter(items)
    const result = sifter.search(term, {
      fields: ['label', 'value'],
      sort: [{ field: 'label', direction: 'asc' }]
    })
    return result.items.map((resultItem) => items[resultItem.id])
  }

  canSave = (): boolean => {
    const address = this.props.value
    const { addresses } = this.props

    return trim(address) !== '' && wallet.isAddress(address) && !values(addresses).includes(address)
  }
}
