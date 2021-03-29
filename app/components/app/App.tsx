import React from 'react'

import styles from './App.scss'

type Props = {
  children: React.ReactNode
}

const App: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  </div>
)

export default App
