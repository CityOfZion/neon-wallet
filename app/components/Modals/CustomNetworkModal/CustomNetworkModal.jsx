// @flow
import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { api, u, rpc as neonJsRpc, sc, wallet } from '@cityofzion/neon-js'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import styles from './CustomNetworkModal.scss'
import CloseButton from '../../CloseButton'
import Add from '../../../assets/icons/add.svg'
import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import { useSettingsContext } from '../../../context/settings/SettingsContext'

type Props = {
  hideModal: Function,
  handleAddCustomNetwork: Function,
  network: {
    rpc: string,
    api: string,
    label: string,
  },
}

const CustomNetworkModal = ({
  hideModal,
  handleAddCustomNetwork,
  network,
}: Props) => {
  const { settings } = useSettingsContext()
  const [rpc, setRpc] = React.useState('')
  const [api, setApi] = React.useState('')
  const [label, setLabel] = React.useState('')
  const [isValidRpcUrl, setIsValidRpcUrl] = React.useState(false)
  const [isValidLabel, setIsValidLabel] = React.useState(false)
  const [rpcError, setRpcError] = React.useState(`Unable to connect to: ${rpc}`)

  async function validateRpc(rpcUrl: string) {
    try {
      const labels = settings.customNetworks.map(({ rpc }) => rpc)
      const alreadyExists = labels.includes(rpcUrl)
      if (alreadyExists) {
        if (network) {
          if (network.rpc === rpcUrl) {
            return setIsValidRpcUrl(true)
          }
        }
        setIsValidRpcUrl(false)
        return setRpcError(
          `A custom network with the url ${rpcUrl} already exists`,
        )
      }

      const rpcClient = new neonJsRpc.RPCClient(rpcUrl, '2.3.3')
      const results = await rpcClient.getBlockCount()

      if (results) setIsValidRpcUrl(true)
    } catch (error) {
      setIsValidRpcUrl(false)
      setRpcError(`Unable to connect to: ${rpc}`)
    }
  }

  async function validateLabel(name: string) {
    if (network) {
      if (network.label === name) {
        return setIsValidLabel(true)
      }
    }
    const labels = settings.customNetworks.map(({ label }) => label)
    const alreadyExists = labels.includes(name)
    if (alreadyExists) {
      setIsValidLabel(false)
    }
    return true
  }

  useEffect(() => {
    if (network) {
      setRpc(network.rpc)
      setApi(network.api)
      setLabel(network.label)
      validateRpc(network.rpc)
      validateLabel(network.label)
    }
  }, [])

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
            label="Network name"
            placeholder="privatenet48"
            value={label}
            onChange={event => {
              setLabel(event.target.value)
              validateLabel(event.target.value)
            }}
            error={
              !isValidLabel &&
              label &&
              `A custom network with the name ${label} already exists`
            }
          />

          <TextInput
            label="API url"
            placeholder="Example: https://mainnet1.neo.coz.io:443"
            value={api}
            onChange={event => {
              setApi(event.target.value)
            }}
          />

          <TextInput
            label="RPC url"
            placeholder="Example: https://mainnet1.neo.coz.io:443"
            value={rpc}
            onChange={event => {
              setRpc(event.target.value)
              validateRpc(event.target.value)
            }}
            error={!isValidRpcUrl && rpc && rpcError}
          />

          <Box marginTop={36} marginBottom={100}>
            <Button
              onClick={() => {
                handleAddCustomNetwork({ api, rpc, label })
                hideModal()
              }}
              primary
              type="submit"
              disabled={!isValidRpcUrl && !isValidLabel && label}
            >
              Add
            </Button>
          </Box>
        </Box>
      </FullHeightPanel>
    </BaseModal>
  )
}
export default CustomNetworkModal
