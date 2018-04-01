// @flow
import React from 'react'
import Highlighter from 'react-highlight-words'
import classNames from 'classnames'
import { noop, omit, trim, includes, toLower } from 'lodash'

import TextInput from '../TextInput'
import Dropdown from './Dropdown'
import DropdownButton from './DropdownButton'
import styles from './SelectInput.scss'

type Props = {
  className?: string,
  value?: string,
  items: Array<any>,
  renderItem: Function,
  renderAfter: Function,
  getItemValue: Function,
  getSearchResults: Function,
  onFocus?: Function,
  onChange?: Function
}

type State = {
  open: boolean,
  search: string
}

type RenderItemProps = {
  search: string,
  onSelect: Function
}

const defaultRenderAfter = (props) => <DropdownButton {...props} />

const defaultItemValue = (item) => item

const defaultSearchResults = (items, term) => {
  return items.filter((item) => includes(toLower(item), toLower(term)))
}

export default class SelectInput extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    renderAfter: defaultRenderAfter,
    getItemValue: defaultItemValue,
    getSearchResults: defaultSearchResults,
    onFocus: noop,
    onChange: noop
  }

  state = {
    open: false,
    search: ''
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.value !== this.props.value) {
      this.setState({ search: trim(nextProps.value) })
    }
  }

  render = () => {
    const passDownProps = omit(this.props, 'className', 'items', 'renderItem', 'getItemValue',
      'getSearchResults', 'onFocus', 'onChange')

    return (
      <Dropdown
        className={classNames(styles.selectInput, this.props.className)}
        open={this.state.open}
        onClose={this.handleClose}
        renderDropdown={this.renderDropdown}
      >
        <TextInput
          {...passDownProps}
          className={styles.input}
          renderAfter={this.renderAfter}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
      </Dropdown>
    )
  }

  renderAfter = () => {
    return this.props.renderAfter({ onToggle: this.handleToggle })
  }

  renderDropdown = ({ className }: { className: string }) => {
    const items = this.getItems()
    const hasItems = items.length > 0
    const isSearch = this.state.search.length > 0 && this.props.items && this.props.items.length > 0

    if (hasItems) {
      return (
        <div className={classNames(styles.dropdown, className)}>
          {this.renderItems(items)}
        </div>
      )
    } else if (isSearch) {
      return (
        <div className={classNames(styles.dropdown, styles.noSearchResults, className)}>
          No search results.
        </div>
      )
    } else {
      return null
    }
  }

  renderItems = (items: Array<any>) => {
    const { search } = this.state
    const renderItem = this.props.renderItem || this.renderItem

    return items.map((item) => {
      return renderItem(item, { search, onSelect: this.generateSelectHandler(item) })
    })
  }

  renderItem = (item: Object, { search, onSelect }: RenderItemProps) => {
    const { getItemValue } = this.props
    return (
      <div className={styles.dropdownItem} key={getItemValue(item)} tabIndex={0} onClick={onSelect}>
        <Highlighter
          highlightTag='span'
          highlightClassName={styles.highlight}
          searchWords={[search]}
          autoEscape
          textToHighlight={item}
        />
      </div>
    )
  }

  handleFocus = (event: Object, ...args: Array<any>) => {
    const { onFocus } = this.props
    event.persist()
    if (onFocus) {
      onFocus(event, ...args)
    }
    this.handleOpen()
  }

  handleChange = (event: Object) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(event.target.value)
    }
  }

  handleOpen = () => {
    this.handleToggle(true)
  }

  handleClose = () => {
    this.handleToggle(false)
  }

  handleToggle = (open: boolean = !this.state.open) => {
    this.setState({ open, search: '' })
  }

  generateSelectHandler = (item: Object) => {
    return (event: Object) => {
      const { onChange, getItemValue } = this.props
      if (onChange) {
        onChange(getItemValue(item))
      }
      this.handleClose()
    }
  }

  getItems = () => {
    const { items } = this.props
    const { search } = this.state

    if (search.length === 0) {
      return items
    } else {
      return this.props.getSearchResults(items, search)
    }
  }
}
