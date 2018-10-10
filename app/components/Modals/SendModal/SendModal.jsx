// @flow
import React from 'react'

import BaseModal from '../BaseModal'
import ReadCode from './ReadCode'
import ConfirmDetails from './ConfirmDetails';

import parseQRCode from '../../../util/parseQRCode';

type Props = {
  hideModal: () => any,
  showErrorNotification: () => any
}

type State = {
  step: Number,
  recipientData: Object,
}

export default class SendModal extends React.Component<Props, State> {
  state = {
    step: 1,
    recipientData: {}
  }

  isStepTwo = () => {
    return this.state.step === 2;
  }

  gotoPreviousStep = () => {
    this.setState({ 
      step: 1 
    });
  }

  gotoNextStep = (recipientData, stopScanner) => {
    try {
      let parsedRecipientData = parseQRCode(recipientData);
      stopScanner();

      this.setState({ 
        step: 2,
        recipientData: parsedRecipientData
      })
    } catch(err) {
      this.props.showErrorNotification({ 
        message: `An error occurred while scanning this QR code: ${err}. Please try again.` 
      })
    }
  }

  getStepComponent = () => {
    return ({
      1: <ReadCode gotoNextStep={this.gotoNextStep}/>,
      2: <ConfirmDetails recipientData={this.state.recipientData}/>
    })[this.state.step]
  }

  render() {
      return (
        <BaseModal
          style={{ content: { width: '775px', height: '830px' } }}
          backButtonAction={this.isStepTwo() ? this.gotoPreviousStep : null}
          hideModal={this.props.hideModal}
        >
          {this.getStepComponent()}
        </BaseModal>
      )
  }
}