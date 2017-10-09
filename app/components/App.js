import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SplitPane from 'react-split-pane'

const StatusMessage = ({ status, statusMessage }) => {
  let message = null
  if (status === true) {
    message = (<div className='statusMessage success'>
      {statusMessage}
    </div>)
  } else if (status === false) {
    message = <div className='statusMessage fail'>{statusMessage}</div>
  }
  return message
}

let App = ({ children, status, statusMessage }) => {
  let statusPaneSize
  if (status !== null) {
    statusPaneSize = '30px'
  } else {
    statusPaneSize = '0px'
  }
  return (<div id='pageWrapper'>
    <SplitPane className='statusSplit' split='horizontal' size={statusPaneSize} allowResize={false}>
      <StatusMessage status={status} statusMessage={statusMessage} />
      <div>{children}</div>
    </SplitPane>
  </div>)
}

const mapStateToProps = (state) => ({
  status: state.transactions.success,
  statusMessage: state.transactions.message
})

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  status: PropTypes.string,
  statusMessage: PropTypes.string
}

App = connect(mapStateToProps)(App)

export default App
