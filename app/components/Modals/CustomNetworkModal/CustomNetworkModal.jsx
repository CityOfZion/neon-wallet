// @flow
import React from 'react'
import { Box } from '@chakra-ui/react'
import { api, u, rpc, sc, wallet } from '@cityofzion/neon-js'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import styles from './CustomNetworkModal.scss'
import CloseButton from '../../CloseButton'
import Add from '../../../assets/icons/add.svg'
import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'

type Props = {
  hideModal: Function,
  handleAddCustomNetwork: Function,
}

const CustomNetworkModal = ({ hideModal, handleAddCustomNetwork }: Props) => {
  const [url, setUrl] = React.useState('')
  const [isValidRpcUrl, setIsValidRpcUrl] = React.useState(false)

  async function validateUrl(rpcUrl: string) {
    // const endpoint = 'http://127.0.0.1:50012'
    try {
      const rpcClient = new rpc.RPCClient(rpcUrl, '2.3.3')
      const results = await rpcClient.getBlockCount()
      if (results) setIsValidRpcUrl(true)
    } catch (error) {
      setIsValidRpcUrl(false)
    }
  }

  return (
    <BaseModal
      hideModal={hideModal}
      shouldRenderHeader={false}
      style={{
        content: {
          width: '730px',
          height: '100%',
        },
      }}
    >
      {' '}
      <FullHeightPanel
        containerClassName={styles.releaseNotesContainer}
        renderInstructions={false}
        renderHeaderIcon={() => <Add />}
        headerText="Add Custom Network"
        renderCloseButton={() => (
          <div className={styles.closeButton} onClick={() => hideModal()}>
            <CloseButton renderWithoutLink />
          </div>
        )}
      >
        <Box width="400px" marginTop="48px">
          <TextInput
            label="RPC Url"
            placeholder="Example: https://mainnet1.neo.coz.io:443"
            value={url}
            onChange={event => {
              setUrl(event.target.value)
              validateUrl(event.target.value)
            }}
            error={!isValidRpcUrl && url && `Unable to connect to: ${url}`}
          />

          <Box marginTop={36} marginBottom={100}>
            <Button
              onClick={() => {
                handleAddCustomNetwork(url)
                hideModal()
              }}
              primary
              type="submit"
              disabled={!isValidRpcUrl}
            >
              Connect
            </Button>
          </Box>
        </Box>
      </FullHeightPanel>
    </BaseModal>
  )
}
export default CustomNetworkModal
