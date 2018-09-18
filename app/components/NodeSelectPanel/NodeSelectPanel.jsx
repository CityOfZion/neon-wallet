// @flow
import React from 'react'
import classNames from 'classnames'

import { ROUTES } from '../../core/constants'
import FullHeightPanel from '../Panel/FullHeightPanel'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import CloseButton from '../CloseButton'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import AddIcon from '../../assets/icons/add.svg'
import Tooltip from '../Tooltip'
import styles from './NodeSelectPanel.scss'

type Node = {
  latency: string,
  url: string,
  blockCount: number
}

type Props = {
  nodes: Node[],
  nodesShown: number,
  loading: Boolean,
  loadNodesData: Function,
  saveSelectedNode: Function,
  selectedNode: string
}

export default class NodeSelect extends React.Component<Props> {
  render() {
    const { loading, loadNodesData, nodesShown } = this.props
    return (
      <FullHeightPanel
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
                onClick={loading ? null : loadNodesData}
                className={classNames(styles.icon, {
                  [styles.loading]: loading
                })}
              />
            </Tooltip>

            <div className={styles.count}>Top {nodesShown} nodes listed</div>

            {this.renderAutomaticSelect()}
          </div>
          {this.renderNodeList()}
        </section>
      </FullHeightPanel>
    )
  }

  renderAutomaticSelect = () => {
    const { selectedNode } = this.props
    let icon

    if (selectedNode) {
      icon = (
        <AddIcon
          className={styles.icon}
          onClick={() => this.handleSelect('')}
        />
      )
    } else {
      icon = <ConfirmIcon className={styles.icon} />
    }

    return (
      <Tooltip title="Select automatically" className={styles.automaticSelect}>
        {icon}
        <span onClick={() => this.handleSelect('')}>Select automatically</span>
      </Tooltip>
    )
  }

  handleSelect = (url: string) => {
    const { saveSelectedNode } = this.props
    saveSelectedNode(url)
  }

  getLatencyClass = (latency: number) => {
    if (latency < 250) {
      return styles.good
    }
    if (latency < 750) {
      return styles.ok
    }
    return styles.fair
  }

  renderNodeList = () => {
    const { nodes, selectedNode } = this.props
    if (nodes) {
      const listItems = nodes.map((node, index) => {
        const { latency, blockCount, url } = node

        let icon
        if (selectedNode === url) {
          icon = <ConfirmIcon className={styles.icon} />
        } else {
          icon = <AddIcon className={styles.icon} />
        }

        return (
          <div key={index} className={styles.row}>
            <div className={styles.latency}>
              <div className={this.getLatencyClass(parseInt(latency, 10))} />
              <span>{latency}ms</span>
            </div>
            <div className={styles.blockHeight}>Block Height: {blockCount}</div>
            <div className={styles.url}>{url}</div>
            <div
              className={styles.select}
              onClick={() => this.handleSelect(url)}
            >
              {icon}
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