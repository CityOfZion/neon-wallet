// @flow
import React from 'react'

import NodeSelectPanel from '../../components/NodeSelectPanel'
import styles from './NodeSelect.scss'

export default class NodeSelect extends React.Component<Props> {
  render() {
    return <NodeSelectPanel className={styles.panel} />
  }
}
