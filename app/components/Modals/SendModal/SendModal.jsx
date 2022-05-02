// @flow
import React from 'react'
import { type ProgressState } from 'spunky'

import BaseModal from '../BaseModal'
import ReadCode from './ReadCode'
import ConfirmDetails from './ConfirmDetails'
import type { RecipientData } from '../../../util/parseQRCode'

type Props = {
  hideModal: () => any,
  pushQRCodeData: (data: Object) => any,
  getRecipientData: (url: string, chain?: string, net: string) => any,
  clearRecipientData: () => null,
  recipientData: ?RecipientData,
  progress: ProgressState,
  chain: string,
  net: string,
}

export default class SendModal extends React.Component<Props> {
  confirmAndClose = (recipientData: RecipientData) => {
    const { pushQRCodeData, hideModal, clearRecipientData } = this.props
    pushQRCodeData(recipientData)
    clearRecipientData()
    hideModal()
  }

  get stepComponent(): React$Element<ConfirmDetails | ReadCode> {
    const { recipientData, getRecipientData, progress, chain, net } = this.props

    //  eslint-disable-next-line
    return recipientData ? (
      chain === 'neo3' ? (
        // $FlowFixMe
        this.confirmAndClose(recipientData)
      ) : (
        <ConfirmDetails
          recipientData={recipientData}
          confirmAndClose={() => this.confirmAndClose(recipientData)}
        />
      )
    ) : (
      <ReadCode
        callback={url => getRecipientData(url, chain, net)}
        callbackProgress={progress}
      />
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
