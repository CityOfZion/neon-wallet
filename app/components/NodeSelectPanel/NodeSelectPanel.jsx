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

type State = {
  refreshDisabled: boolean
}

export default class NodeSelect extends React.Component<Props, State> {
  state = {
    refreshDisabled: false
  }

  render() {
    const { loading, nodesShown } = this.props
    return (
      <FullHeightPanel
        headerText="Node Selection"
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderHeaderIcon={this.renderIcon}
        renderInstructions={false}
        instructionsClassName={styles.instructions}
      >
        <div className={styles.instructions}>
          If you’re experiencing performance issues, try selecting a custom node
          below
        </div>
        <section className={styles.tableContainer}>
          <div className={styles.header}>
            <div
              className={classNames(styles.refresh, {
                [styles.refreshDisabled]: this.state.refreshDisabled
              })}
            >
              <span onClick={this.handleRefreshNodeData}> Refresh </span>
              <RefreshIcon
                id="refresh"
                onClick={this.handleRefreshNodeData}
                className={classNames(styles.icon, {
                  [styles.loading]: loading
                })}
              />
            </div>

            <div className={styles.count}>Top {nodesShown} nodes listed</div>

            {this.renderAutomaticSelect()}
          </div>
          {this.renderNodeList()}
        </section>
      </FullHeightPanel>
    )
  }

  handleRefreshNodeData = () => {
    const { loading, loadNodesData } = this.props
    const { refreshDisabled } = this.state
    if (!refreshDisabled) {
      loadNodesData()
      this.setState({ refreshDisabled: true })
      setTimeout(() => {
        this.setState({ refreshDisabled: false })
      }, 15000)
    }
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
      <Tooltip
        title="Allow NEON to choose a node automatically"
        className={classNames(styles.automaticSelect, {
          [styles.selected]: !selectedNode
        })}
      >
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
        let rowClass
        if (selectedNode === url) {
          icon = <ConfirmIcon className={styles.icon} />
          rowClass = styles.selected
        } else {
          icon = <AddIcon className={styles.icon} />
        }

        return (
          <div
            key={index}
            className={classNames(styles.row, rowClass, {
              [styles.odd]: index % 2 !== 0
            })}
          >
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
}
