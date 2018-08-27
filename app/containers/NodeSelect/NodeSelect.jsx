// @flow
import React from 'react'

import { ROUTES } from '../../core/constants'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import CloseButton from '../../components/CloseButton'
import styles from './NodeSelect.scss'

type Props = {}

export default class NodeSelect extends React.Component<Props> {
  render = () => (
    <FullHeightPanel
      className={styles.nodeSelectPanel}
      headerText="Node Selection"
      renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
      renderHeaderIcon={this.renderIcon}
      renderInstructions={this.renderInstructions}
      instructionsClassName={styles.instructions}
    />
  )

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
