// @flow
import React from 'react'

import { MODAL_TYPES } from '../../core/constants'
import ConfirmModal from '../../components/Modals/ConfirmModal'

const {
  CONFIRM
} = MODAL_TYPES

const MODAL_COMPONENTS = {
  [CONFIRM]: ConfirmModal
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
