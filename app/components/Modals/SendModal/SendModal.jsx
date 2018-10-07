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
}

export default class SendModal extends React.Component<Props, State> {
  state = {
    step: 2
  }

  getCurrentStep(){
    switch (this.state.step) {
      default:
      case 1:
      return {
          title: 'Use a QR Code',
          component: <ReadCode/>
        }
      case 2:
        return {
          title: 'QR Code Identified!',
          backAction: () => this.setState({ step: 1 }),
          component: <ConfirmDetails/>
        }
    }
  }

  render() {
      const currentStep = this.getCurrentStep();
      const { hideModal } = this.props;

      return (
        <BaseModal
          title={currentStep.title}
          backAction={currentStep.backAction}
          hideModal={hideModal}
          style={{ content: { width: '775px', height: '830px' } }}
        >
          {currentStep.component}
        </BaseModal>
      )
  }
}
