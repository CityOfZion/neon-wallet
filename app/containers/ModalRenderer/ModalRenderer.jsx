// @flow
import React from 'react'
import { omit } from 'lodash-es'

import ConfirmModal from '../../components/Modals/ConfirmModal'
import TokenInfoModal from '../../components/Modals/TokenInfoModal'
import TokenModal from '../../components/Modals/TokenModal'
import TokenSaleModal from '../../components/Modals/TokenSaleModal'
import AddContactModal from '../../components/Modals/AddContactModal'
import ReceiveModal from '../../components/Modals/ReceiveModal'
import SendModal from '../../components/Modals/SendModal'

import { MODAL_TYPES } from '../../core/constants'

const {
  CONFIRM,
  SEND,
  TOKEN_INFO,
  TOKEN,
  ICO,
  ADD_CONTACT,
  RECEIVE
} = MODAL_TYPES

const MODAL_COMPONENTS = {
  [CONFIRM]: ConfirmModal,
  [TOKEN_INFO]: TokenInfoModal,
  [TOKEN]: TokenModal,
  [ICO]: TokenSaleModal,
  [ADD_CONTACT]: AddContactModal,
  [RECEIVE]: ReceiveModal,
  [SEND]: SendModal
}

type Props = {
  modalType?: ModalType,
  modalProps: Object,
  hideModal: () => any,
  showErrorNotification: Object => any,
  showSuccessNotification: Object => any,
  showInfoNotification: Object => any,
  showWarningNotification: Object => any
}

const ModalRenderer = (props: Props) => {
  const { modalType, modalProps } = props

  if (modalType) {
    const Modal = MODAL_COMPONENTS[modalType]
    return (
      <Modal {...modalProps} {...omit(props, ['modalType', 'modalProps'])} />
    )
  }

  return null
}

export default ModalRenderer
