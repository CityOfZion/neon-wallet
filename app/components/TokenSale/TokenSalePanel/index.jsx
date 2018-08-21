<<<<<<< HEAD
// @flow
=======
>>>>>>> f2528034fb8bfe44b0b9dbc5fd4d95831f1065ad
import React from 'react'

import Panel from '../../Panel'
import TokenSaleSelection from './TokenSaleSelection'
import TokenSaleConditions from './TokenSaleConditions'
import DialogueBox from '../../DialogueBox'
import Button from '../../Button'
import WarningIcon from '../../../assets/icons/warning.svg'
import CheckMarkIcon from '../../../assets/icons/check.svg'

import styles from './TokenSalePanel.scss'

type Props = {
  setStep: () => void
}

const TokenSalePanel = ({ setStep }: Props) => (
  <Panel renderHeader={() => <p>Participate in Token Sale</p>}>
    <div className={styles.tokenSalePanelContainer}>
      <TokenSaleSelection />
      <DialogueBox
        icon={<WarningIcon />}
        text="Please read and acknowledge these statements to continue"
        className={styles.tokenSalePanelDialogueBox}
      />
      <TokenSaleConditions />
      <Button
        onClick={() => setStep('confirm')}
        primary
        renderIcon={CheckMarkIcon}
        className={styles.tokenSaleButton}
      >
        Continue
      </Button>
    </div>
  </Panel>
)

export default TokenSalePanel
