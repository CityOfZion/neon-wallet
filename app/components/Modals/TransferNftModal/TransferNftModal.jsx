// @flow
import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { wallet as n3Wallet, sc } from '@cityofzion/neon-js-next'

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

type Props = {
  hideModal: () => any,
  imageHref: string,
  url: string,
  mediaType: string,
  isWatchOnly: boolean,
  showModal: (type: string, props: any) => any,
  contract: string,
  contacts: Object,
  intl: Object,
  net: string,
  address: string,
  tokenId: string,
  wif: string,
  showSuccessNotification: ({ message: string }) => any,
  showErrorNotification: ({ message: string }) => any,
}

export default function TransferNftModal(props: Props) {
  const {
    hideModal,
    contract,
    contacts,
    intl,
    net,
    tokenId,
    address,
    wif,
    showSuccessNotification,
    showErrorNotification,
  } = props
  function handleSubmit() {}

  const DEFAULT_FEES = {
    systemFee: 0,
    networkFee: 0,
  }

  const [recipientAddress, setRecipientAddress] = useState('')
  const [recipientAddressError, setRecipientAddressError] = useState('')
  const [gasFee, setGasFee] = useState(DEFAULT_FEES)
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false)

  function toggleHasEnoughGas(hasGas) {
    setSendButtonDisabled(!hasGas)
  }

  function isValidAddress(address: string) {
    if (address[0].toLocaleUpperCase() !== 'N') {
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
    const isContactString = Object.keys(contacts).find(
      contact => contact === value,
    )
    if (isContactString) {
      normalizedValue = contacts[value]
    }
    setRecipientAddressError('')
    setRecipientAddress(normalizedValue)
    isValidAddress(normalizedValue)
  }

  async function testInvoke() {
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
    const results = await new N3Helper(endpoint, 0).rpcCall(account, testReq)
    const fee = convertToArbitraryDecimals(results.result.gasconsumed)
    setGasFee({
      networkFee: fee,
      systemFee: 0,
    })
  }

  async function transfer() {
    try {
      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }
      const account = new n3Wallet.Account(wif)
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
      const results = await new N3Helper(endpoint, 0).rpcCall(account, testReq)

      const { result } = results

      showSuccessNotification({
        message:
          'Transaction pending! Your NFT will be transferred once the blockchain has processed it.',
      })
      hideModal()
    } catch (e) {
      console.error({ e })
      showErrorNotification({
        message: 'An unknown error has occurred. Please try again.',
      })
    }
  }

  useEffect(() => {
    testInvoke()
  }, [])

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
            items={Object.keys(contacts)}
            onFocus={() => setRecipientAddressError('')}
            error={recipientAddressError}
          />
          <N3Fees fees={gasFee} notEnoughGasCallback={toggleHasEnoughGas} />{' '}
          <Button
            className={styles.submitButton}
            primary
            type="submit"
            disabled={
              recipientAddressError || !recipientAddress || sendButtonDisabled
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
