// @flow
import React from 'react'

import BaseModal from '../BaseModal'
import ReadCode from './ReadCode'
import ConfirmDetails from './ConfirmDetails'
import type { RecipientData } from '../../../util/parseQRCode'

type Props = {
  hideModal: () => any,
  pushQRCodeData: (data: Object) => any,
  getRecipientData: string => any,
  clearRecipientData: Function,
  recipientData: ?RecipientData
}

export default class SendModal extends React.Component<Props> {
  confirmAndClose = (recipientData: RecipientData) => {
    const { pushQRCodeData, hideModal } = this.props

    pushQRCodeData(recipientData)
    hideModal()
  }

  get stepComponent(): React$Element<ConfirmDetails | ReadCode> {
    const { recipientData, getRecipientData } = this.props
    return recipientData ? (
      <ConfirmDetails
        recipientData={recipientData}
        confirmAndClose={() => this.confirmAndClose(recipientData)}
      />
    ) : (
      <ReadCode gotoNextStep={getRecipientData} />
    )
  }

  render() {
    const { hideModal, clearRecipientData, recipientData } = this.props
    return (
      <BaseModal
        style={{ content: { width: '775px', height: '100%' } }}
        backButtonAction={recipientData ? clearRecipientData : null}
        hideModal={hideModal}
      >
        {this.stepComponent}
      </BaseModal>
    )
  }
}
