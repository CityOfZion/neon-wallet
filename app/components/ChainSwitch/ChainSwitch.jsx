// @flow
import React from 'react'
import Switch from 'react-switch'

import styles from './ChainSwitch.scss'
import { imageMap } from '../../assets/nep5/svg'
import N3Logo from '../../assets/images/n3_logo.png'
import OldNeoLogo from '../../assets/images/neo-logo.png'
import { THEMES } from '../../core/constants'
import classNames from 'classnames'

const NEO_IMAGE = imageMap.NEO

type Props = {
  chain: string,
  updateChain: () => void,
  theme: string,
}

export default class CloseButton extends React.Component<Props> {
  render = () => {
    const { chain, updateChain } = this.props

    const { theme } = this.props
    const onColor = theme === THEMES.LIGHT ? '#5c677f' : '#5c677f'
    const offColor = theme === THEMES.LIGHT ? '#5c677f' : '#5c677f'

    return (
      <div className={styles.chainToggleContainer}>
        <div
          className={classNames({
            [styles.labelContainer]: true,
            [styles.disabled]: chain === 'neo3',
          })}
        >
          <img src={OldNeoLogo} alt="legacy" />
          <h5>LEGACY</h5>{' '}
        </div>

        <div>
          <label htmlFor="neon-switch">
            <Switch
              checked={chain === 'neo3'}
              onChange={updateChain}
              onColor={onColor}
              // onHandleColor="#4cffb3"
              // offHandleColor="#4cffb3"
              offColor={offColor}
              handleDiameter={24}
              uncheckedIcon={false}
              checkedIcon={false}
              // boxShadow="inset 0 1px 3px 0 rgba(0,0,0,0.50)"
              // activeBoxShadow="inset 0 1px 3px 0 rgba(0,0,0,0.50)"
              height={22}
              width={48}
              className="neon-chain-switch"
              id="neon-chain-switch"
            />
          </label>
        </div>
        <div
          className={classNames({
            [styles.labelContainer]: true,
            [styles.disabled]: chain !== 'neo3',
          })}
        >
          <img src={NEO_IMAGE} alt="n3" />
          <h5>N3</h5>{' '}
        </div>
      </div>
    )
  }
}
