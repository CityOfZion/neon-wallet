// @flow

export const getModalType = (state: Object) => state.modal.modalType
export const getModalProps = (state: Object) => state.modal.modalProps

// Constants
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'

// Actions
export const showModal = (modalType: ModalType, modalProps: Object = {}) => ({
  type: SHOW_MODAL,
  payload: {
    modalType,
    modalProps
  }
})

export const hideModal = () => ({
  type: HIDE_MODAL
})

const initialState = {
  modalType: null,
  modalProps: {}
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SHOW_MODAL: // eslint-disable-line no-case-declarations
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
