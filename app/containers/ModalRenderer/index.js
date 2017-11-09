// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ModalRenderer from './ModalRenderer'
import { getModalType, getModalProps, hideModal } from '../../modules/modal'

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
  modalProps: getModalProps(state)
})

const actionCreators = {
  hideModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ModalRenderer)
