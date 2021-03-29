import React, { Component } from 'react'

import styles from './App.scss'
import themes from '../../themes'

class App extends Component<Props> {
  render() {
    const { children, theme } = this.props
    return (
      <div style={themes[theme]} className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    )
  }
}

export default App
