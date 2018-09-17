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
  renderHeader: ?Function
}

export default class Panel extends React.Component<Props> {
  static defaultProps = {
    renderHeader: null
  }

  render = () => (
    <div className={classNames(styles.panel, this.props.className)}>
      {this.renderHeader()}
      {this.renderContent()}
    </div>
  )

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
      <Content className={classNames(styles.content, contentClassName)}>
        {children}
      </Content>
    )
  }
}
