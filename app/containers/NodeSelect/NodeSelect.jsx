// @flow
import React from 'react'
import { keys } from 'lodash'

import { ROUTES } from '../../core/constants'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import CloseButton from '../../components/CloseButton'
import DropdownIcon from '../../assets/icons/dropdown.svg'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import styles from './NodeSelect.scss'

type Sort = 'highToLow' | 'lowToHigh'

type Node = {
  protocal: string,
  url: string,
  location: string,
  port: string,
  locale: string,
  type: string
}

type Props = {
  setSort: Function,
  sort: string,
  nodesShown: int,
  nodes: Node[]
}

const SORT_BY_LATENCY: { [key: Sort]: string } = {
  highToLow: 'Latency high > low',
  lowToHigh: 'Latency low > high'
}

export default class NodeSelect extends React.Component<Props, State> {
  render() {
    const { nodesShown } = this.props

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
            <div className={styles.sortContainer}>
              <span className={styles.label}>Sorting</span>
              <span className={styles.sort} onClick={this.handleChangeSort}>
                {this.getSort()}
                <DropdownIcon className={styles.icon} />
              </span>
            </div>
            <div className={styles.count}>Top {nodesShown} nodes listed</div>
            <div className={styles.automaticSelect}>
              <ConfirmIcon className={styles.icon} />
              <span>Select automatically</span>
            </div>
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

  // FIXME temp random latency generator
  getRandomLatency = () => {
    const min = 1
    const max = 1000
    const rand = min + Math.random() * (max - min)
    return Math.round(rand)
  }

  // FIXME remove index as key - unreliable
  renderNodeList = () => {
    const { nodes } = this.props
    if (nodes) {
      const listItems = nodes.map((node, index) => {
        const latency = this.getRandomLatency()
        const url = node.protocol ? `${node.protocol}://${node.url}` : node.url
        return (
          <div key={index} className={styles.row}>
            <div className={styles.latency}>
              <div className={this.getLatencyClass(latency)} />
              <span>{latency}ms</span>
            </div>
            <div className={styles.blockHeight}>
              Block Height: {node.blockCount}
            </div>
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

  handleChangeSort = () => {
    const { sort } = this.props
    const sortOptions = keys(SORT_BY_LATENCY)
    const index = (sortOptions.indexOf(sort) + 1) % sortOptions.length
    this.props.setSort(sortOptions[index])
  }

  getSort = () => {
    const { sort } = this.props
    if (!sort) {
      return ''
    }
    return SORT_BY_LATENCY[sort]
  }
}
