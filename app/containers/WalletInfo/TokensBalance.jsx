// @flow
import React from 'react'
import styles from './TokensBalance.scss'
import InfoOutline from 'react-icons/lib/md/info-outline'
import Tooltip from '../../components/Tooltip'

type Props = {
  tokensBalance: Array<Object>,
  tokensInfo: Array<Object>,
}

const addTokenRows = (tokensBalance, tokensInfo) => {
  return tokensBalance.map((token) => {
    const tokenName = Object.keys(token)[0]
    const tokenInfo = tokensInfo.find(token => token[tokenName])
    let tooltip = tokenName
    if (tokenInfo) {
      tooltip = (
        <div style={{ textAlign: 'left' }}>
          <p>{tokenInfo[tokenName].name}</p>
          <p>Total Supply: {tokenInfo[tokenName].totalSupply}</p>
          <p>Decimals: {tokenInfo[tokenName].decimals}</p>
        </div>
      )
    }
    return (
      <tr key={tokenName}>
        <td className={styles.tokenName}><Tooltip html={tooltip}><InfoOutline className={styles.tokenNameIcon} />{tokenName}</Tooltip></td>
        <td>{token[tokenName]}</td>
      </tr>
    )
  })
}

const TokensBalance = ({ tokensBalance, tokensInfo }: Props) => (
  <div>
    {tokensBalance.length > 0 &&
      <table className={styles.table}>
        <thead>
          <th>Token</th>
          <th>Balance</th>
        </thead>
        <tbody>
          {addTokenRows(tokensBalance, tokensInfo)}
        </tbody>
      </table>
    }
  </div>
)

export default TokensBalance
