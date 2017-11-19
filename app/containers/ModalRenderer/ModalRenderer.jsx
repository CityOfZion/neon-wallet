// @flow
import React from 'react'
import { MODAL_TYPES } from '../../core/constants'
import ConfirmModal from '../../components/Modals/ConfirmModal'
import ReceiveModal from '../../components/Modals/ReceiveModal'
import SendModal from '../../components/Modals/SendModal'

const {
  CONFIRM,
  RECEIVE,
  SEND
} = MODAL_TYPES

const MODAL_COMPONENTS = {
  [CONFIRM]: ConfirmModal,
  [RECEIVE]: ReceiveModal,
  [SEND]: SendModal
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
