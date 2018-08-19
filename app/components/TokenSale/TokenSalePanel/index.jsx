import React from 'react'

import Panel from '../../Panel'
import TokenSaleSelection from './TokenSaleSelection'
import TokenSaleConditions from './TokenSaleConditions'
import DialogueBox from '../../DialogueBox'
import WarningIcon from '../../../assets/icons/warning.svg'

import styles from './TokenSalePanel.scss'

const TokenSalePanel = () => (
  <Panel renderHeader={() => <p>Participate in Token Sale</p>}>
    <TokenSaleSelection />
    <DialogueBox
      icon={<WarningIcon />}
      text="Please read and acknowledge these statements to continue"
      className={styles.tokenSalePanelDialogueBox}
    />
    <TokenSaleConditions />
  </Panel>
)

export default TokenSalePanel
