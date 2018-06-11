// @flow
import React from 'react'
import { omit } from 'lodash'

import ConfirmModal from '../../components/Modals/ConfirmModal'
import ReceiveModal from '../../components/Modals/ReceiveModal'
import SendModal from '../../components/Modals/SendModal'
import TokenInfoModal from '../../components/Modals/TokenInfoModal'
import TokenModal from '../../components/Modals/TokenModal'
import TokenSaleModal from '../../components/Modals/TokenSaleModal'
import EncryptedLoginModal from '../../components/Modals/EncryptedLoginModal'

import { MODAL_TYPES } from '../../core/constants'

const { CONFIRM, RECEIVE, SEND, TOKEN_INFO, TOKEN, ICO, ENCRYPTED_LOGIN } = MODAL_TYPES

const MODAL_COMPONENTS = {
  [CONFIRM]: ConfirmModal,
  [RECEIVE]: ReceiveModal,
  [SEND]: SendModal,
  [TOKEN_INFO]: TokenInfoModal,
  [TOKEN]: TokenModal,
  [ICO]: TokenSaleModal,
  [ENCRYPTED_LOGIN]: EncryptedLoginModal
}

type Props = {
  modalType?: ModalType,
  modalProps: Object,
  hideModal: () => any,
  showErrorNotification: (Object) => any,
  showSuccessNotification: (Object) => any,
  showInfoNotification: (Object) => any,
  showWarningNotification: (Object) => any,
}

const ModalRenderer = (props: Props) => {
  const { modalType, modalProps } = props

  if (modalType) {
    const Modal = MODAL_COMPONENTS[modalType]
    return (<Modal
      {...modalProps}
      {...omit(props, ['modalType', 'modalProps'])}
    />)
  }

  return null
}

export default ModalRenderer
