// @flow
import React from 'react'
import { compose } from 'recompose'
import { injectIntl, IntlShape } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BSNeo3 } from '@cityofzion/bs-neo3'

import { showModal } from '../../../../../modules/modal'
import SelectInput from '../../../../Inputs/SelectInput'
import NumberInput from '../../../../Inputs/NumberInput'
import DisplayInput from '../../../DisplayInput'
import { isNumber, toBigNumber } from '../../../../../core/math'
import { formatNumberByDecimalScale } from '../../../../../core/formatters'
import TrashCanIcon from '../../../../../assets/icons/delete.svg'
import { useContactsContext } from '../../../../../context/contacts/ContactsContext'
import styles from '../SendRecipientList.scss'
import { MODAL_TYPES } from '../../../../../core/constants'

type Props = {
  asset: string,
  amount: number,
  address: string,
  max: number,
  index: number,
  errors: Object,
  sendableAssets: Object,
  showConfirmSend: boolean,
  numberOfRecipients: number,
  clearErrors: (index: number, field: string) => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any,
  calculateMaxValue: (asset: string, index: number) => string,
  intl: IntlShape,
  isMigration: boolean,
  showModal: (modalType: string, modalProps: Object) => any,
  chain: string,
}

function SendRecipientListItem(props: Props) {
  const { contacts } = useContactsContext()

  function handleFieldChange(
    value: string,
    type: 'asset' | 'amount' | 'address',
  ) {
    const {
      index,
      updateRowField,
      clearErrors,
      calculateMaxValue,
      asset,
      isMigration,
      showModal,
    } = props
    let normalizedValue = value
    if (type === 'address') {
      const contact = contacts[value]

      // if the value is an address and contains .neo it indicates that it is potentially
      // an NNS domain so we verify and manipulate the value here
      if (value.includes('.neo') && !contact) {
        const NeoBlockChainService = new BSNeo3()
        NeoBlockChainService.getOwnerOfNNS(value).then(results => {
          clearErrors(index, type)
          updateRowField(index, type, results)
        })
      }

      if (contact) {
        const filteredByChain = contact.filter(c => c.chain === props.chain)

        // if the contact has multiple addresses for the chain we need to render a modal
        // which allows them to select the address they want to send to
        if (filteredByChain.length > 1) {
          return showModal(MODAL_TYPES.CHOOSE_ADDRESS_FROM_CONTACT, {
            contactName: value,
            chain: props.chain,
            onClick: address => {
              clearErrors(index, type)
              updateRowField(index, type, address)
            },
          })
        }
        normalizedValue = filteredByChain[0].address
      }
    } else if (type === 'amount' && value && isNumber(value)) {
      const dynamicMax = calculateMaxValue(asset, index)
      normalizedValue = toBigNumber(value).gt(toBigNumber(dynamicMax))
        ? dynamicMax
        : value
    }
    clearErrors(index, type)
    updateRowField(index, type, normalizedValue)
  }

  function handleMaxClick() {
    const { index, updateRowField, calculateMaxValue, asset } = props
    const max = calculateMaxValue(asset, index)
    updateRowField(index, 'amount', max.toString())
  }

  function handleDeleteRow() {
    const { index, removeRow } = props
    removeRow(index)
  }

  function clearErrorsOnFocus(e: Object) {
    const { name } = e.target
    const { clearErrors, index } = props
    clearErrors(index, name)
  }

  function createAssetList(): Array<string> {
    return Object.keys(props.sendableAssets)
  }

  function createContactList(): Array<string> {
    // filter out contacts if they do not contain
    // addresses for the current chain
    const { chain } = props
    const filteredContacts = Object.keys(contacts).filter(contact =>
      contacts[contact].some(address => address.chain === chain),
    )
    return filteredContacts
  }

  const {
    index,
    address,
    amount,
    asset,
    errors,
    max,
    showConfirmSend,
    numberOfRecipients,
    intl,
    isMigration,
  } = props

  const selectInput = showConfirmSend ? (
    <DisplayInput value={asset} />
  ) : (
    <SelectInput
      value={asset}
      name="asset"
      onChange={value => handleFieldChange(value, 'asset')}
      items={createAssetList()}
      onFocus={clearErrorsOnFocus}
    />
  )

  const numberInput = showConfirmSend ? (
    <DisplayInput value={formatNumberByDecimalScale(amount)} />
  ) : (
    <NumberInput
      value={amount || 0}
      max={max}
      name="amount"
      onChange={(e, value) => handleFieldChange(value, 'amount')}
      handleMaxClick={handleMaxClick}
      onFocus={clearErrorsOnFocus}
      error={errors && errors.amount}
      options={{ numeralDecimalScale: 8 }}
    />
  )
  // TODO: this should be converted to use the StyledReactSelect component
  // currently the UI does not indicate if there are no contacts
  const addressInput = showConfirmSend ? (
    <DisplayInput value={address} />
  ) : (
    <SelectInput
      placeholder={intl.formatMessage({ id: 'sendAddressPlaceholder' })}
      value={address || ''}
      name="address"
      onChange={value => handleFieldChange(value, 'address')}
      items={isMigration ? [] : createContactList()}
      onFocus={clearErrorsOnFocus}
      error={errors && errors.address}
      disabled={isMigration}
    />
  )

  const trashCanButton = showConfirmSend ? null : (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={handleDeleteRow}
      disabled={showConfirmSend}
    >
      <TrashCanIcon />
    </button>
  )

  return (
    <li className={styles.sendRecipientListItem}>
      {!isMigration && (
        <div className={styles.rowNumber}>{`${`0${index + 1}`.slice(-2)}`}</div>
      )}
      <div className={styles.asset}>{selectInput}</div>
      <div className={styles.amount}>{numberInput}</div>
      <div className={styles.address}>{addressInput}</div>
      {!isMigration && (
        <div className={styles.delete}>
          {numberOfRecipients > 1 && trashCanButton}
        </div>
      )}
    </li>
  )
}

const actionCreators = {
  showModal,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(injectIntl(SendRecipientListItem))
