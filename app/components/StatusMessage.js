// @flow
import React from 'react'

type Props = {
    status: boolean,
    statusMessage: string,
}

const StatusMessage = ({ status, statusMessage }: Props) => {
  if (status) {
    return (
      <div className='statusMessage success'>
        {statusMessage}
      </div>
    )
  } else if (!status) {
    return (
      <div className='statusMessage fail'>{statusMessage}</div>
    )
  }
  return null
}

export default StatusMessage
