// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { noop } from 'lodash'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import ContactForm from '../ContactForm'
import ArrowIcon from '../../../assets/icons/arrow.svg'
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

    // headerText={option === 'CREATE' ? 'Create New Wallet' : 'Import Wallet'}
    // renderHeaderIcon={() =>
    //   option === 'IMPORT' ? <AddIcon /> : <AddIcon />
    // }
    // renderBackButton={() => <BackButton routeTo={ROUTES.HOME} />}

    return (
      <FullHeightPanel
        className={classNames(styles.addContactPanel, className)}
        renderHeaderIcon={() => <AddIcon />}
        renderBackButton={() => <BackButton routeTo={ROUTES.CONTACTS} />}
        headerText="Add A Contact"
        instructions="Insert Contact Details"
      >
        <ContactForm
          formName={name}
          newAddress
          formAddress={address}
          submitLabel="Add to Contacts"
          onSubmit={this.handleSubmit}
        />
      </FullHeightPanel>
    )
  }

  // renderHeader = () => (
  //   <span className={styles.header}>
  //     <Link to={ROUTES.CONTACTS} className={styles.back}>
  //       <ArrowIcon />
  //     </Link>
  //     <span>New Contact</span>
  //   </span>
  // )

  handleSubmit = (name: string, address: string) => {
    this.props.onSave(name, address)
  }
}
