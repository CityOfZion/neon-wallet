// @flow
import React from 'react'

import BaseModal from '../BaseModal'
import ReadCode from './ReadCode'
import ConfirmDetails from './ConfirmDetails'

import parseQRCode from '../../../util/parseQRCode'

type Props = {
  hideModal: () => any,
  showErrorNotification: (error: Object) => any,
  hideNotification: (id: string) => any,
  pushQRCodeData: (data: Object) => any
}

type State = {
  step: string,
  error: ?string,
  recipientData: Object
}

export default class SendModal extends React.Component<Props, State> {
  state = {
    step: '1',
    error: null,
    recipientData: {}
  }

  displayError = (message: string) => {
    const { showErrorNotification } = this.props

    const newError = showErrorNotification({
      message: `An error occurred while scanning this QR code: ${message}. Please try again.`
    })

    this.setState({ error: newError })
  }

  isStepTwo = () => this.state.step === '2'

  gotoPreviousStep = () => {
    this.setState({
      step: '1'
    })
  }

  gotoNextStep = (recipientData: Object, stopScanner: Function) => {
    const { error } = this.state
    const { hideNotification } = this.props

    try {
      const parsedRecipientData = parseQRCode(recipientData)

      stopScanner()

      if (error) hideNotification(error)

      this.setState({
        step: '2',
        recipientData: parsedRecipientData
      })
    } catch (message) {
      this.displayError(message)
    }
  }

  confirmAndClose = () => {
    const { pushQRCodeData, hideModal } = this.props

    pushQRCodeData(this.state.recipientData)
    hideModal()
  }

  getStepComponent = () =>
    ({
      '1': <ReadCode gotoNextStep={this.gotoNextStep} />,
      '2': (
        <ConfirmDetails
          recipientData={this.state.recipientData}
          confirmAndClose={this.confirmAndClose}
        />
      )
    }[this.state.step])

  render() {
    return (
      <BaseModal
        style={{ content: { width: '775px', height: '100%' } }}
        backButtonAction={this.isStepTwo() ? this.gotoPreviousStep : null}
        hideModal={this.props.hideModal}
      >
        {this.getStepComponent()}
      </BaseModal>
    )
  }
}
