// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { noop } from 'lodash-es'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import ContactForm from '../ContactForm'
import ArrowIcon from '../../../assets/icons/arrow.svg'
import Close from '../../../assets/icons/close.svg'
import AddIcon from '../../../assets/icons/add.svg'
import BackButton from '../../BackButton'
import { ROUTES, MODAL_TYPES } from '../../../core/constants'
import styles from './EditContactPanel.scss'

type Props = {
  className: ?string,
  name: string,
  address: string,
  onSave: Function,
  deleteContact: string => void,
  showSuccessNotification: ({ message: string }) => void,
  showModal: (modalType: string, modalProps: Object) => any
}

export default class EditContactPanel extends React.Component<Props> {
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
        headerText="Edit A Contact"
        renderInstructions={() => (
          <div className={styles.editContactInstructions}>
            <div>Modify Details</div>
            <span onClick={this.handleDelete}>
              <Close /> Remove Contact
            </span>
          </div>
        )}
      >
        <div className={styles.formContainer}>
          <ContactForm
            formName={name}
            mode="edit"
            formAddress={address}
            onSubmit={this.handleSubmit}
          />
        </div>
      </FullHeightPanel>
    )
  }

  renderHeader = () => (
    <span className={styles.header}>
      <Link to={ROUTES.CONTACTS} className={styles.back}>
        <ArrowIcon />
      </Link>
      <span>Edit Contact</span>
    </span>
  )

  handleSubmit = (name: string, address: string) => {
    this.props.onSave(name, address)
  }

  handleDelete = () => {
    const { name, showModal, showSuccessNotification } = this.props

    showModal(MODAL_TYPES.CONFIRM, {
      title: 'Confirm Delete',
      text: `Please confirm removing contact - ${name}`,
      onClick: () => {
        this.props.deleteContact(name)
        showSuccessNotification({
          message: 'Contact removal was successful.'
        })
      }
    })
  }
}
