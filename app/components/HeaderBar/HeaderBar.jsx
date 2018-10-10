// @flow
import React from 'react'
import classNames from 'classnames'

import RefreshButton from '../../containers/Buttons/RefreshButton'

import styles from './HeaderBar.scss'

type Props = {
  label: string,
  shouldRenderRefresh?: boolean,
  renderLeftContent?: () => any,
  renderRightContent?: () => any
}

export default class HeaderBar extends React.PureComponent<Props> {
  static defaultProps = {
    label: ''
  }

  render() {
    const {
      label,
      shouldRenderRefresh = false,
      renderLeftContent = () => null,
      renderRightContent = () => null
    } = this.props

    return (
      <div className={styles.headerBar}>
        {label ? <h3> {label}</h3> : renderLeftContent()}
<<<<<<< HEAD
        {shouldRenderRefresh ? <RefreshButton /> : renderRightContent()}
=======
        {shouldRenderRefresh ? (
          <div className={styles.refreshButton}>
            <RefreshIcon
              id="refresh"
              className={classNames(styles.refresh, {
                [styles.loading]: loading
              })}
              onClick={loading ? null : loadWalletData}
            />
            <span onClick={loading ? null : loadWalletData}> Refresh </span>
          </div>
        ) : (
          renderRightContent()
        )}
>>>>>>> design-v2
      </div>
    )
  }
}
