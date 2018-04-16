// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { noop } from 'lodash'

import Panel from '../../Panel'
import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import AddIcon from '../../../assets/icons/contacts-add.svg'
import ArrowIcon from '../../../assets/icons/arrow.svg'
import { ROUTES } from '../../../core/constants'
import styles from './EditContactPanel.scss'

type Props = {
  className: ?string,
  name: string,
  address: string,
  setName: Function,
  setAddress: Function,
  onSave: Function
}

export default class EditContactPanel extends React.Component<Props> {
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
        className={classNames(styles.editContactPanel, className)}
        renderHeader={this.renderHeader}
      >
        <form onSubmit={this.handleSubmit}>
          <TextInput
            className={styles.input}
            placeholder='Contact Name'
            value={name}
            onChange={this.handleChangeName}
          />
          <TextInput
            className={styles.input}
            placeholder='Address'
            value={address}
            onChange={this.handleChangeAddress}
          />
          <Button
            className={styles.button}
            primary
            type='submit'
            renderIcon={AddIcon}
          >
            Save Contact
          </Button>
        </form>
      </Panel>
    )
  }

  renderHeader = () => {
    return (
      <span className={styles.header}>
        <Link to={ROUTES.CONTACTS} className={styles.back}><ArrowIcon /></Link>
        <span>Edit Contact</span>
      </span>
    )
  }

  handleChangeName = (event: Object) => {
    this.props.setName(event.target.value)
  }

  handleChangeAddress = (event: Object) => {
    this.props.setAddress(event.target.value)
  }

  handleSubmit = (event: Object) => {
    const { name, address, onSave } = this.props

    event.preventDefault()
    onSave(name, address)
  }
}
