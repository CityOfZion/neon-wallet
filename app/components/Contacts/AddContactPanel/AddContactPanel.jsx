// @flow
import React from 'react'
import { noop } from 'lodash-es'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import ContactForm from '../ContactForm'
import { ROUTES } from '../../../core/constants'
import AddIcon from '../../../assets/icons/add.svg'
import BackButton from '../../BackButton'

import styles from './AddContactPanel.scss'

type Props = {
  className: ?string,
  name: string,
  address: string,
  onSave: Function
}

export default class AddContactPanel extends React.Component<Props> {
  static defaultProps = {
    name: '',
    address: '',
    setName: noop,
    setAddress: noop,
    onSave: noop
  }

  render() {
    const { className, name, address } = this.props

    return (
      <FullHeightPanel
        className={className}
        renderHeaderIcon={() => <AddIcon />}
        renderBackButton={() => <BackButton routeTo={ROUTES.CONTACTS} />}
        headerText="Add A Contact"
        renderInstructions={() => <div>Insert Contact Details</div>}
      >
        <div className={styles.formContainer}>
          <ContactForm
            formName={name}
            newAddress
            formAddress={address}
            submitLabel="Add to Contacts"
            onSubmit={this.handleSubmit}
          />
        </div>
      </FullHeightPanel>
    )
  }

  handleSubmit = (name: string, address: string) => {
    this.props.onSave(name, address)
  }
}
