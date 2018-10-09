// @flow
import React from 'react'

import BaseModal from '../BaseModal'
import ReadCode from './ReadCode'
import ConfirmDetails from './ConfirmDetails';

type Props = {
  hideModal: Function,
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

  gotoNextStep = (recipientData) => {
    this.setState({ 
      step: 2,
      recipientData
    })
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
