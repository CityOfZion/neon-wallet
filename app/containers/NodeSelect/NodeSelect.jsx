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

type Props = {
  setSort: Function,
  sort: string,
  nodesShown: int
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
        </section>
      </FullHeightPanel>
    )
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
