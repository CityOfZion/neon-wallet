// @flow
import React from 'react'
import classNames from 'classnames'

import { ROUTES } from '../../core/constants'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import CloseButton from '../../components/CloseButton'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import Tooltip from '../../components/Tooltip'
import styles from './NodeSelect.scss'

type Node = {
  latency: string,
  url: string,
  blockCount: int
}

type Props = {
  nodes: Node[],
  loading: Boolean,
  loadNodesData: Function
}

export default class NodeSelect extends React.Component<Props, State> {
  render() {
    const { nodes, loading, loadNodesData } = this.props
    const count = nodes ? nodes.length : 0
    return (
      <FullHeightPanel
        className={styles.nodeSelectPanel}
        headerText="Node Selection"
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderHeaderIcon={this.renderIcon}
        renderInstructions={this.renderInstructions}
        instructionsClassName={styles.instructions}
      >
        <section className={styles.tableContainer}>
          <div className={styles.header}>
            <Tooltip title="Refresh" className={styles.refresh}>
              <span onClick={loading ? null : loadNodesData}> Refresh </span>
              <RefreshIcon
                id="refresh"
                onClick={loading ? null : this.getNodes}
                className={classNames(styles.icon, {
                  [styles.loading]: loading
                })}
              />
            </Tooltip>

            <div className={styles.count}>Top {count} nodes listed</div>
            <Tooltip
              title="Select automatically"
              className={styles.automaticSelect}
            >
              <ConfirmIcon className={styles.icon} />
              <span>Select automatically</span>
            </Tooltip>
          </div>
          {this.renderNodeList()}
        </section>
      </FullHeightPanel>
    )
  }

  getLatencyClass = latency => {
    if (latency < 250) {
      return styles.good
    }
    if (latency < 750) {
      return styles.ok
    }
    return styles.fair
  }

  // FIXME remove index as key - unreliable
  renderNodeList = () => {
    const { nodes } = this.props
    if (nodes) {
      const listItems = nodes.map((node, index) => {
        const { latency, blockCount, url } = node
        return (
          <div key={index} className={styles.row}>
            <div className={styles.latency}>
              <div className={this.getLatencyClass(latency)} />
              <span>{latency}ms</span>
            </div>
            <div className={styles.blockHeight}>Block Height: {blockCount}</div>
            <div className={styles.url}>{url}</div>
            <div className={styles.select}>
              <ConfirmIcon className={styles.icon} />
              <span>Select</span>
            </div>
          </div>
        )
      })
      return <div className={styles.content}>{listItems}</div>
    }
    return <span>Loading</span>
  }

  renderIcon = () => (
    <div>
      <NodeSelectIcon />
    </div>
  )

  renderInstructions = () => (
    <div>
      If you’re experiencing performance issues, try selecting a custom node
      below
    </div>
  )
}
