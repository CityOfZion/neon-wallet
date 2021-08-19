// @flow
import React from 'react'
import { omit } from 'lodash-es'

import ConfirmModal from '../../components/Modals/ConfirmModal'
import TokenInfoModal from '../../components/Modals/TokenInfoModal'
import TokenModal from '../../components/Modals/TokenModal'
import AddContactModal from '../../components/Modals/AddContactModal'
import ReceiveModal from '../../components/Modals/ReceiveModal'
import SendModal from '../../components/Modals/SendModal'
import GeneratedTransactionModal from '../../components/Modals/GeneratedTransactionModal'
import ImportTransactionModal from '../../components/Modals/ImportTransactionModal'
import { MODAL_TYPES } from '../../core/constants'
import ReleaseNotesModal from '../../components/Modals/ReleaseNotesModal'
import ShowQrForExportModal from '../../components/Modals/ShowQrForExportModal'
import MigrationDetails from '../../components/Modals/MigrationDetails'

const {
  CONFIRM,
  SEND,
  TOKEN_INFO,
  TOKEN,
  ADD_CONTACT,
  RECEIVE,
  GENERATED_TRANSACTION,
  IMPORT_TRANSACTION,
  RELEASE_NOTES,
  SHOW_QR_FOR_EXPORT,
  MIGRATION_DETAILS,
} = MODAL_TYPES

const MODAL_COMPONENTS = {
  [CONFIRM]: ConfirmModal,
  [TOKEN_INFO]: TokenInfoModal,
  [TOKEN]: TokenModal,
  [ADD_CONTACT]: AddContactModal,
  [RECEIVE]: ReceiveModal,
  [SEND]: SendModal,
  [GENERATED_TRANSACTION]: GeneratedTransactionModal,
  [IMPORT_TRANSACTION]: ImportTransactionModal,
  [RELEASE_NOTES]: ReleaseNotesModal,
  [SHOW_QR_FOR_EXPORT]: ShowQrForExportModal,
  [MIGRATION_DETAILS]: MigrationDetails,
}

type Props = {
  modalType?: ModalType,
  modalProps: Object,
  hideModal: () => any,
  showErrorNotification: Object => any,
  showSuccessNotification: Object => any,
  showInfoNotification: Object => any,
  showWarningNotification: Object => any,
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
