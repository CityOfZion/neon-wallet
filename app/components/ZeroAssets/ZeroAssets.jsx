// @flow

import React from 'react'
import {
  FormattedHTMLMessage,
  FormattedMessage,
  IntlShape,
  injectIntl,
} from 'react-intl'

import TextInput from '../Inputs/TextInput'
import CopyToClipboard from '../CopyToClipboard'
import LogoWithStrikethrough from '../LogoWithStrikethrough'
import Panel from '../Panel'
import styles from './ZeroAssets.scss'

type Props = {
  address: string,
  children?: React$Node,
  intl: IntlShape,
}

const ZeroAssets = ({ address, children, intl }: Props) => (
  <Panel
    renderHeader={() => (
      <p>
        <FormattedMessage id="noAvailableAssetsToSend" />
      </p>
    )}
  >
    <section className={styles.zeroAssets}>
      <div className={styles.emptyBalanceContainer}>
        <LogoWithStrikethrough />
        <p>
          <FormattedHTMLMessage id="depositAssets" />
        </p>
        <div className={styles.address}>
          <TextInput value={address} disabled />
          <CopyToClipboard
            className={styles.copy}
            text={address}
            tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
          />
        </div>
      </div>
    </section>
    {children}
  </Panel>
)

export default injectIntl(ZeroAssets)
