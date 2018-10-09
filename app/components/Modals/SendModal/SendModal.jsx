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
  constructor(){
    super();
    this.gotoNextStep = this.gotoNextStep.bind(this);
  }

  state = {
    step: 2,
    recipientData: {}
  }

  gotoPreviousStep(){
    if(this.state.step === 2){
      return () => this.setState({ step: 1 });
    }

    return null;
  }

  gotoNextStep(recipientData){
    this.setState({ 
      step: 2,
      recipientData
    })
  }

  getStepComponent(){
    return ({
      1: <ReadCode gotoNextStep={this.gotoNextStep}/>,
      2: <ConfirmDetails recipientData={this.state.recipientData}/>
    })[this.state.step]
  }

  render() {
      return (
        <BaseModal
          style={{ content: { width: '775px', height: '830px' } }}
          backButtonAction={this.gotoPreviousStep()}
          hideModal={this.props.hideModal}
        >
          {this.getStepComponent()}
        </BaseModal>
      )
  }
}
