// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import SelectInput from '../SelectInput'
import styles from './AssetInput.scss'

type Props = {
  className?: string,
  symbols: Array<SymbolType>
}

export default class AssetInput extends React.Component<Props> {
  render = () => {
    const passDownProps = omit(this.props, 'symbols')

    return (
      <SelectInput
        {...passDownProps}
        className={classNames(styles.assetInput, this.props.className)}
        items={this.props.symbols} />
    )
  }
}
