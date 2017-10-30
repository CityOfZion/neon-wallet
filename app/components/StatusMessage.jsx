// @flow
import React from 'react'
import { isNil } from 'lodash'
import classNames from 'classnames'

type Props = {
    status: boolean,
    statusMessage: string,
}

const StatusMessage = ({ status, statusMessage }: Props) => {
  if (isNil(status)) {
    return null
  }
  return <div className={classNames('statusMessage', status ? 'success' : 'fail')}>{statusMessage}</div>
}

export default StatusMessage
