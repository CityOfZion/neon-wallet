// @flow
import React, { useState } from 'react'

import { ROUTES } from '../../../core/constants'
import CloseButton from '../../CloseButton'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import styles from '../../../containers/ConnectDapp/styles.scss'
import TextInput from '../../Inputs/TextInput'
import Button from '../../Button'
import LockIcon from '../../../assets/icons/add.svg'

type Props = {
  onURI: (uri: string) => Promise<void>,
}

const ConnectionUrlForm = ({ onURI }: Props) => {
  const [url, setUrl] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  async function handleSubmit() {
    if (buttonDisabled) return

    setButtonDisabled(true)
    try {
      await onURI(url)
    } finally {
      setButtonDisabled(false)
    }
  }

  const renderInstructions = () => (
    <p>
      All transactions requested by a connected Dapp will be presented for
      signing before being broadcast to the blockchain. No action from the Dapp
      will happen without your direct approval.
    </p>
  )

  return (
    <FullHeightPanel
      headerText="Connect with a dApp"
      renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
      renderHeaderIcon={() => (
        <div>
          <LockIcon />
        </div>
      )}
      renderInstructions={renderInstructions}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          name="dApp URL"
          label="Scan or Paste URL"
          placeholder="Scan or Paste URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          error={null}
        />
        <Button
          id="loginButton"
          primary
          type="submit"
          className={styles.loginButtonMargin}
        >
          Connect
        </Button>
      </form>
    </FullHeightPanel>
  )
}

export default ConnectionUrlForm
