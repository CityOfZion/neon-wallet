// @flow
import React from 'react'
import { noop } from 'lodash'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import AddIcon from '../../../assets/icons/contacts-add.svg'
import styles from './ContactForm.scss'

type Props = {
  submitLabel: string,
  name: string,
  address: string,
  setName: Function,
  setAddress: Function,
  onSubmit: Function
}

export default class ContactForm extends React.Component<Props> {
  static defaultProps = {
    submitLabel: 'Save Contact',
    name: '',
    address: '',
    setName: noop,
    setAddress: noop,
    onSubmit: noop
  }

  render () {
    const { submitLabel, name, address } = this.props

    return (
      <form className={styles.contactForm} onSubmit={this.handleSubmit}>
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
          {submitLabel}
        </Button>
      </form>
    )
  }

  handleChangeName = (event: Object) => {
    this.props.setName(event.target.value)
  }

  handleChangeAddress = (event: Object) => {
    this.props.setAddress(event.target.value)
  }

  handleSubmit = (event: Object) => {
    const { onSubmit, name, address } = this.props

    event.preventDefault()
    onSubmit(name, address)
  }
}
