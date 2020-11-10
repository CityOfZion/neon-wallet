// @flow
import React from 'react'
import classNames from 'classnames'

import Panel from '../Panel'
import Loader from '../Loader'
import styles from './LoadingPanel.scss'

type Props = {
  className: ?string,
  title: ?string,
}

export default class LoadingPanel extends React.Component<Props> {
  static defaultProps = {
    title: 'Loading',
  }

  render() {
    return (
      <Panel
        className={classNames(styles.loadingPanel, this.props.className)}
        contentClassName={styles.content}
        renderHeader={this.props.title ? this.renderHeader : null}
      >
        <Loader />
      </Panel>
    )
  }

  renderHeader = () => <span>{this.props.title}</span>
}
