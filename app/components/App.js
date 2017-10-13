// @flow
import React from 'react'
import { connect } from 'react-redux'
import SplitPane from 'react-split-pane'
import StatusMessage from './StatusMessage'

type Props = {
  children: React$Node,
  status: boolean,
  statusMessage: string
}

const App = ({ children, status, statusMessage }: Props) => {
  const statusPaneSize = status ? '30px' : 0
  return (
    <div id='pageWrapper'>
      <SplitPane
        className='statusSplit'
        split='horizontal'
        size={statusPaneSize}
        allowResize={false}
      >
        <StatusMessage status={status} statusMessage={statusMessage} />
        <div>{children}</div>
      </SplitPane>
    </div>
  )
}

const mapStateToProps = (state) => ({
  status: state.transactions.success,
  statusMessage: state.transactions.message
})

export default connect(mapStateToProps)(App)
