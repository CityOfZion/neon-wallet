// @flow

export const getModalType = (state) => state.modal.modalType
export const getModalProps = (state) => state.modal.modalProps

// Constants
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

// Actions
export const showModal = (modalType: ModalType, modalProps: Object) => {
  return {
    type: SHOW_MODAL,
    payload: {
      modalType,
      modalProps
    }
  }
}

export const hideModal = () => ({
  type: HIDE_MODAL
})

const initialState = {
  modalType: null,
  modalProps: {}
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SHOW_MODAL:
      const { modalType, modalProps } = action.payload
      return {
        modalType,
        modalProps
      }
    case HIDE_MODAL:
      return initialState
    default:
      return state
  }
}
