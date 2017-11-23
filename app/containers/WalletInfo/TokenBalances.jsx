// @flow
import React from 'react'
import styles from './TokenBalances.scss'
import InfoOutline from 'react-icons/lib/md/info-outline'

type Props = {
  tokens: Array<Object>,
}

const addTokenRows = (tokens) => {
  return tokens.map((token) => {
    const tokenName = Object.keys(token)[0]
    return (
      <tr key={tokenName} >
        <td className={styles.tokenName}><InfoOutline className={styles.tokenNameIcon} />{tokenName}</td>
        <td>{token[tokenName]}</td>
      </tr>
    )
  })
}

const TokenBalances = ({ tokens }: Props) => (
  <div>
    {tokens.length > 0 &&
      <table className={styles.table}>
        <thead>
          <th>Token</th>
          <th>Balance</th>
        </thead>
        <tbody>
          {addTokenRows(tokens)}
        </tbody>
      </table>
    }
  </div>
)

export default TokenBalances
