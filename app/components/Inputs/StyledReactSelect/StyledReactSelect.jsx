import React from 'react'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'

const returnDropdownIndicatorColor = props => {
  if (props.selectProps.settingsSelect) return 'var(--settings-link-text)'
  if (props.isFocused && !props.selectProps.hideHighlight) return '#66eb8e'
  return 'var(--input-icon)'
}

const customStyles = {
  option: styles => ({
    ...styles,
    '&:active': {
      backgroundColor: '#e6e6e6',
    },
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontFamily: 'Gotham-Light',
  }),
  control: (styles, props) => ({
    ...styles,
    cursor: 'pointer',
    background: props.selectProps.transparent && 'transparent !important',
    backgroundImage:
      props.isFocused && props.selectProps.hideHighlight && 'none',
    borderColor:
      (props.selectProps.hideHighlight || props.selectProps.settingsSelect) &&
      'transparent !important',
    border: props.selectProps.hideHighlight && 'none !important',
    width: props.selectProps.settingsSelect ? '150px' : 'auto',
    display: props.selectProps.hideControl ? 'none' : 'flex',
  }),
  dropdownIndicator: (styles, props) => ({
    display: props.selectProps.hideChevron ? 'none' : 'flex',
    padding: '8px',
    color: returnDropdownIndicatorColor(props),
    transform: props.selectProps.menuIsOpen && 'rotate(180deg)',
    opacity: props.isDisabled ? 0.6 : 1,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  valueContainer: (styles, props) => {
    const conditionalStyles = props.selectProps.settingsSelect
      ? {
          fontFamily: 'Gotham-Bold',
          fontSize: '14px',
          color: 'var(--settings-select-value-text) !important',
          textAlign: 'right',
          opacity: props.isDisabled ? 0.6 : 1,
        }
      : {}
    return {
      ...styles,
      background: props.selectProps.transparent && 'transparent !important',
      fontSize: props.selectProps.fontSize,
      fontWeight: props.selectProps.fontWeight,
      padding: !props.hideHighlight && '7px 15px !important',
      justifyContent:
        props.selectProps.alignValueContainer ||
        (props.selectProps.settingsSelect && 'flex-end'),
      // maxWidth: '20px',
      ...conditionalStyles,
    }
  },
  singleValue: (styles, props) => {
    const conditionalStyles = props.selectProps.settingsSelect
      ? {
          fontFamily: 'Gotham-Bold',
          fontSize: '14px',
          color: 'var(--settings-select-value-text) !important',
          textAlign: 'right',
        }
      : {}
    return {
      ...styles,
      fontSize: props.selectProps.fontSize,
      fontWeight: props.selectProps.fontWeight,
      [props.selectProps.textAlign]: 0,
      ...conditionalStyles,
    }
  },
}

const StyledReactSelect = props => (
  <FormattedMessage id="inputSelectPlaceholder">
    {translation => (
      <Select
        {...props}
        noOptionsMessage={() => <FormattedMessage id="noOptionsMessage" />}
        loadingMessage={() => <FormattedMessage id="isLoadingMessage" />}
        maxMenuHeight={140}
        styles={customStyles}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder={`${translation}...`}
      />
    )}
  </FormattedMessage>
)

export default StyledReactSelect
