// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash-es'

import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './Label.scss'

type Props = {
  label: string,
  loading: boolean,
  labelClassName: string,
  labelContainerClassName: string,
  renderAdditionalContent: () => React$Node
}

export default class Label extends React.Component<Props> {
  render() {
    const { label, loading, renderAdditionalContent } = this.props

    const passDownProps = omit(this.props, 'label', 'loading')

    const labelClassName = classNames(styles.label, this.props.labelClassName)
    const labelContainerClassName = classNames(
      styles.labelContainer,
      this.props.labelContainerClassName
    )

    return (
      <div className={labelContainerClassName}>
        <label {...passDownProps} className={labelClassName}>
          {label}
        </label>
        {loading && <RefreshIcon className={styles.ledgerStageRefreshIcon} />}
        {renderAdditionalContent && (
          <div className={styles.additionalContentContainer}>
            {renderAdditionalContent()}
          </div>
        )}
      </div>
    )
  }
}
