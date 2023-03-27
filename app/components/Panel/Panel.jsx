// @flow
import React from 'react'
import classNames from 'classnames'

import Content from './Content'
import Header from './Header'
import styles from './Panel.scss'

type Props = {
  className: ?string,
  contentClassName: ?string,
  headerClassName: ?string,
  children: React$Node,
  renderHeader: ?Function,
  onScroll?: Function,
}

export default class Panel extends React.Component<Props> {
  static defaultProps = {
    renderHeader: null,
  }

  renderHeader = () => {
    const { renderHeader, headerClassName } = this.props

    if (renderHeader) {
      return (
        <Header className={classNames(styles.header, headerClassName)}>
          {renderHeader()}
        </Header>
      )
    }

    return null
  }

  renderContent = () => {
    const { contentClassName, children } = this.props

    return (
      <Content
        className={classNames(styles.content, contentClassName)}
        onScroll={this.props.onScroll}
      >
        {children}
      </Content>
    )
  }

  render = () => (
    <div className={classNames(styles.panel, this.props.className)}>
      {this.renderHeader()}
      {this.renderContent()}
    </div>
  )
}
