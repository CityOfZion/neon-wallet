// @flow
import React from 'react'
import classNames from 'classnames'
import styles from './TransactionList.scss'

type Props = {
  className?: string,
  alternateRows?: boolean,
  children: Array<React$Node>,
  rowClassName?: string,
}

export default class TransactionList extends React.Component<Props> {
  renderChildren = () => {
    const { children, alternateRows, rowClassName } = this.props
    return React.Children.map(children, (child, i) => {
      const oddRowClass = alternateRows && {
        [styles.oddNumberedRow]: i % 2 === 0,
      }
      return (
        <li
          key={`txli${i}`}
          className={classNames(rowClassName || styles.row, oddRowClass)}
        >
          {child}
        </li>
      )
    })
  }

  render = () => (
    <ul
      id="transactionList"
      className={classNames(styles.transactionList, this.props.className)}
    >
      {this.renderChildren()}
    </ul>
  )
}
