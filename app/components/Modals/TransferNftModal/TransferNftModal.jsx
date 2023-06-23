// @flow
import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'
import { BSNeo3 } from '@cityofzion/bs-neo3'

import { NFT } from '../../../containers/NftGallery/NftGallery'
import Button from '../../Button'
import SelectInput from '../../Inputs/SelectInput'
import TextInput from '../../Inputs/TextInput'
import N3Fees from '../../Send/N3Fees'
import BaseModal from '../BaseModal'
import styles from './TransferNftModal.scss'
import { getNode, getRPCEndpoint } from '../../../actions/nodeStorageActions'
import N3Helper from '../../../context/WalletConnect/helpers'
import { convertToArbitraryDecimals } from '../../../core/formatters'
import { addPendingTransaction } from '../../../actions/pendingTransactionActions'
import { useContactsContext } from '../../../context/contacts/ContactsContext'
import { MODAL_TYPES } from '../../../core/constants'

type Props = {
  hideModal: () => any,
  mediaUri: string,
  url: string,
  mediaType: string,
  isWatchOnly: boolean,
  showModal: (type: string, props: any) => any,
  contract: string,
  intl: Object,
  net: string,
  address: string,
  tokenId: string,
  wif: string,
  showSuccessNotification: ({ message: string }) => any,
  showErrorNotification: ({ message: string }) => any,
  showInfoNotification: ({ message: string }) => any,
  hideNotification: (id: string) => void,
  dispatch: any => any,
  isHardwareLogin: boolean,
  signingFunction: () => void,
  recipientAddressProp: string,
  publicKey: string,
}

export default function TransferNftModal(props: Props) {
  const {
    hideModal,
    contract,
    intl,
    net,
    tokenId,
    address,
    wif,
    dispatch,
    isHardwareLogin,
    signingFunction,
    showSuccessNotification,
    showErrorNotification,
    showInfoNotification,
    hideNotification,
    recipientAddressProp,
    publicKey,
  } = props
  function handleSubmit() {}

  const DEFAULT_FEES = {
    systemFee: 0,
    networkFee: 0,
  }

  const [recipientAddress, setRecipientAddress] = useState(
    recipientAddressProp ?? '',
  )
  const [recipientAddressError, setRecipientAddressError] = useState('')
  const [gasFee, setGasFee] = useState(DEFAULT_FEES)
  const [feesInitialized, setFeesInitialized] = useState(false)
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const { contacts } = useContactsContext()

  function toggleHasEnoughGas(hasGas) {
    setSendButtonDisabled(!hasGas)
  }

  function isValidAddress(address: string) {
    if (address && address[0] && address[0].toLocaleUpperCase() !== 'N') {
      setRecipientAddressError(
        intl.formatMessage({
          id: 'errors.send.invalidN3Address',
        }),
      )
      return false
    }

    if (!n3Wallet.isAddress(address)) {
      setRecipientAddressError(
        intl.formatMessage({
          id: 'errors.send.invalidN3Address',
        }),
      )
      return false
    }

    setRecipientAddressError('')

    return true
  }

  function updateRecipient(value) {
    let normalizedValue = value
    const contact = contacts[value]
    // if the value is an address and contains .neo it indicates that it is potentially
    // an NNS domain so we verify and manipulate the value here
    if (value.includes('.neo') && !contact) {
      const NeoBlockChainService = new BSNeo3()
      return NeoBlockChainService.getOwnerOfNNS(value).then(results => {
        // clearErrors(index, type)
        // updateRowField(index, type, results)
        setRecipientAddressError('')
        setRecipientAddress(results)
        isValidAddress(results)
      })
    }

    if (contact) {
      const filteredByChain = contact.filter(c => c.chain === 'neo3')

      // if the contact has multiple addresses for the chain we need to render a modal
      // which allows them to select the address they want to send to
      if (filteredByChain.length > 1) {
        return props.showModal(MODAL_TYPES.CHOOSE_ADDRESS_FROM_CONTACT, {
          contactName: value,
          chain: 'neo3',
          onClick: address => {
            setTimeout(() => {
              props.showModal(MODAL_TYPES.TRANSFER_NFT, {
                ...props,
                recipientAddressProp: address,
              })
            }, 0)
          },
          onCancel: () => {
            setTimeout(() => {
              props.showModal(MODAL_TYPES.TRANSFER_NFT, {
                ...props,
                recipientAddressProp: '',
              })
            }, 0)
          },
        })
      }
      normalizedValue = filteredByChain[0].address
    }

    setRecipientAddressError('')
    setRecipientAddress(normalizedValue)
    isValidAddress(normalizedValue)
  }

  async function transfer() {
    try {
      setLoading(true)
      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }
      const account = new n3Wallet.Account(isHardwareLogin ? publicKey : wif)
      const testReq = {
        params: {
          request: {
            method: 'multiInvoke',
            params: {
              invocations: [
                {
                  scriptHash: contract,
                  operation: 'transfer',
                  args: [
                    {
                      type: 'Hash160',
                      value: recipientAddress,
                    },
                    { type: 'ByteArray', value: tokenId },
                    { type: 'Any', value: null },
                  ],
                },
              ],
              signers: [{ scopes: 1 }],
            },
          },
        },
      }

      const results = await new N3Helper(endpoint, 0).rpcCall(
        account,
        testReq,
        isHardwareLogin,
        signingFunction,
        showInfoNotification,
        hideNotification,
      )

      const { result } = results

      dispatch(
        addPendingTransaction.call({
          address,
          net,
          tx: {
            hash: result,
            sendEntries: [
              { amount: 1, address, contractHash: contract, symbol: 'N/A' },
            ],
          },
        }),
      )

      showSuccessNotification({
        message: 'Transaction pending! Your NFT will be transferred shortly.',
      })
      setLoading(false)
      hideModal()
    } catch (e) {
      hideModal()
      showErrorNotification({
        message: e.message,
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    async function testInvoke() {
      setLoading(true)
      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }
      const account = new n3Wallet.Account(address)
      const testReq = {
        params: {
          request: {
            method: 'testInvoke',
            params: {
              invocations: [
                {
                  scriptHash: contract,
                  operation: 'transfer',
                  args: [
                    {
                      type: 'Hash160',
                      value: address,
                    },
                    { type: 'ByteArray', value: tokenId },
                    { type: 'Any', value: null },
                  ],
                },
              ],
              signers: [{ scopes: 1 }],
            },
          },
        },
      }
      const results = await new N3Helper(endpoint, 0).rpcCall(
        account,
        testReq,
        isHardwareLogin,
        signingFunction,
        showInfoNotification,
        hideNotification,
      )
      const fee = convertToArbitraryDecimals(results.result.gasconsumed)
      setGasFee({
        networkFee: fee,
        systemFee: 0,
      })
      setFeesInitialized(true)
      setLoading(false)
    }
    testInvoke()
  }, [])

  function createContactList(): Array<string> {
    const filteredContacts = Object.keys(contacts).filter(contact =>
      contacts[contact].some(address => address.chain === 'neo3'),
    )
    return filteredContacts
  }

  return (
    <BaseModal
      style={{ content: { width: '775px', height: '100%' } }}
      hideModal={hideModal}
    >
      <section className={styles.formContainer}>
        <div className={styles.nftContainer}>
          <NFT {...props} />
        </div>
        <form className={styles.encryptForm} onSubmit={handleSubmit}>
          <TextInput
            id="contract"
            name="contract"
            label="contract"
            value={contract}
            disabled
          />
          <SelectInput
            label={<FormattedMessage id="sendAddressLabel" />}
            placeholder={intl.formatMessage({ id: 'sendAddressPlaceholder' })}
            value={recipientAddress}
            name="address"
            onChange={updateRecipient}
            items={createContactList()}
            onFocus={() => setRecipientAddressError('')}
            error={recipientAddressError}
          />

          <N3Fees
            fees={loading && !feesInitialized ? DEFAULT_FEES : gasFee}
            notEnoughGasCallback={toggleHasEnoughGas}
          />

          <Button
            className={styles.submitButton}
            primary
            type="submit"
            disabled={
              recipientAddressError ||
              !recipientAddress ||
              sendButtonDisabled ||
              loading
            }
            onClick={() => transfer()}
          >
            Confirm
          </Button>
        </form>
      </section>
    </BaseModal>
  )
}
