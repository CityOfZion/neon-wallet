// @flow
import React from 'react'

import ConfirmModal from '../../components/Modals/ConfirmModal'
import ReceiveModal from '../../components/Modals/ReceiveModal'
import SendModal from '../../components/Modals/SendModal'
import TokenInfoModal from '../../components/Modals/TokenInfoModal'

import { MODAL_TYPES } from '../../core/constants'

const {
  CONFIRM,
  RECEIVE,
  SEND,
  TOKEN_INFO
} = MODAL_TYPES

const MODAL_COMPONENTS = {
  [CONFIRM]: ConfirmModal,
  [RECEIVE]: ReceiveModal,
  [SEND]: SendModal,
  [TOKEN_INFO]: TokenInfoModal
}

type Props = {
    modalType?: ModalType,
    modalProps: Object,
    hideModal: Function
}

const ModalRenderer = (props: Props) => {
  const { modalType, modalProps, hideModal } = props

  if (modalType) {
    const Modal = MODAL_COMPONENTS[modalType]
    return <Modal {...modalProps} hideModal={hideModal} />
  }

  return null
}

export default ModalRenderer
