// @flow
import React from 'react'
import { noop } from 'lodash'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import DialogueBox from '../../DialogueBox'
import AddContactIcon from '../../../assets/icons/contacts-add.svg'
import AddIcon from '../../../assets/icons/add.svg'
import WarningIcon from '../../../assets/icons/warning.svg'
import styles from './ContactForm.scss'

type Props = {
  submitLabel: string,
  name: string,
  address: string,
  mode?: string,
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

  render() {
    const { submitLabel, name, address, mode } = this.props

    let heading = 'Add A Contact'
    let subHeading = 'Insert Contact Details'

    if (mode === 'edit') {
      heading = 'Edit A Contact'
      subHeading = 'Modify Contact Details'
    }

    return (
      <secion>
        <h1 className={styles.contactFormHeader}>
          <AddIcon /> {heading}
        </h1>
        <form className={styles.contactForm} onSubmit={this.handleSubmit}>
          <h2 className={styles.contactFormSubheader}>{subHeading}</h2>
          <label htmlFor="contactName" className={styles.contactFormLabel}>
            Name
          </label>
          <TextInput
            id="contactName"
            className={styles.input}
            placeholder="Enter Contact Name..."
            value={name}
            onChange={this.handleChangeName}
          />
          <label htmlFor="contactAdress" className={styles.contactFormLabel}>
            Wallet Address
          </label>
          <TextInput
            id="contactAddress"
            className={styles.input}
            placeholder="Enter Wallet Address..."
            value={address}
            onChange={this.handleChangeAddress}
          />
          <DialogueBox
            icon={<WarningIcon />}
            text="Please review and ensure that you have entered the address correctly to avoid loss of funds"
            className={styles.conactFormDialogue}
          />
          <Button
            className={styles.button}
            primary
            type="submit"
            renderIcon={AddContactIcon}
          >
            {submitLabel}
          </Button>
        </form>
      </secion>
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
