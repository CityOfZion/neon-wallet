// @flow

import React from 'react'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import Loader from '../Loader'
import FullHeightPanel from '../Panel/FullHeightPanel'

const ConnectionLoader = () => (
  <FullHeightPanel
    renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
    renderHeaderIcon={() => null}
    renderInstructions={false}
  >
    <div>
      <Loader />
    </div>
  </FullHeightPanel>
)

export default ConnectionLoader
