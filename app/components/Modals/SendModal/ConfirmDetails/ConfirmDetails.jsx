// @flow
import React from 'react'

import Button from '../../../Button'
import baseStyles from '../SendModal.scss'
import GridIcon from '../../../../assets/icons/grid.svg'

type Props = {

}

type State = {

}

export default class ConfirmDetails extends React.Component<Props, State> {
  render() { 
    return (
      <div className={baseStyles.contentContainer}>
        <div className={baseStyles.header}>
          <GridIcon className={baseStyles.icon} />
          <div className={baseStyles.title}>QR Code Identified!</div>
        </div>

        <div className={baseStyles.section}>
          <div className={baseStyles.sectionTitle}>PAYMENT DETAILS</div>
          <div className={baseStyles.sectionContent}>
            <Button primary>
              Send Assets
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
