// @flow
import React from 'react'
import Highlighter from 'react-highlight-words'
import Sifter from 'sifter'
import { omit, map } from 'lodash'

import SelectInput, { DropdownButton } from '../SelectInput'

import styles from './AddressInput.scss'

type ItemType = {
  label: string,
  value: string
}

type Props = {
  value: string,
  contacts?: Object
}

export default class AddressInput extends React.Component<Props> {
  static defaultProps = {
    contacts: {}
  }

  render = () => {
    const passDownProps = omit(this.props, 'contacts', 'dispatch')

    return (
      <SelectInput
        {...passDownProps}
        className={styles.addressInput}
        items={this.getItems()}
        renderAfter={DropdownButton}
        renderItem={this.renderItem}
        getItemValue={this.getItemValue}
        getSearchResults={this.getSearchResults}
      />
    )
  }

  renderItem = (
    item: ItemType,
    { search, onSelect }: { search: string, onSelect: Function }
  ) => (
    <div className={styles.addressItem} key={item.label} onClick={onSelect}>
      <div className={styles.label}>
        <Highlighter
          highlightTag="span"
          highlightClassName={styles.highlight}
          searchWords={[search]}
          autoEscape
          textToHighlight={item.label}
        />
      </div>
      <div className={styles.value}>
        <Highlighter
          highlightTag="span"
          highlightClassName={styles.highlight}
          searchWords={[search]}
          autoEscape
          textToHighlight={item.value}
        />
      </div>
    </div>
  )

  getItems = (): Array<ItemType> => {
    const { contacts } = this.props
    if (!contacts) {
      return []
    }
    return map(contacts, (address, name) => ({
      label: name,
      value: address
    }))
  }

  getItemValue = (item: ItemType): string => item.value

  getSearchResults = (
    items: Array<ItemType>,
    term: string
  ): Array<ItemType> => {
    const sifter = new Sifter(items)
    const result = sifter.search(term, {
      fields: ['label', 'value'],
      sort: [{ field: 'label', direction: 'asc' }]
    })
    return result.items.map(resultItem => items[resultItem.id])
  }
}
