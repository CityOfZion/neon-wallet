// @flow
import React from 'react'
import classNames from 'classnames'
import { noop } from 'lodash'

import Content from './Content'
import Header from './Header'
import styles from './Panel.scss'

type Props = {
  className: ?string,
  children: React$Node,
  renderHeader: Function
}

export default class Panel extends React.Component<Props> {
  static defaultProps = {
    renderHeader: noop
  }

  render = () => {
    return (
      <div className={classNames(styles.panel, this.props.className)}>
        <Header className={styles.header}>
          {this.renderHeader()}
        </Header>

        <Content className={styles.content}>
          {this.renderContent()}
        </Content>
      </div>
    )
  }

  renderHeader = () => {
    return this.props.renderHeader()
  }

  renderContent = () => {
    return this.props.children
  }
}
