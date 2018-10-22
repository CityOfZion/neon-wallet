import React from 'react'
import Select from 'react-select'
import { omit } from 'lodash-es'

const returnDropdownIndicatorColor = props => {
  if (props.selectProps.settingsSelect) return 'var(--settings-link-text)'
  if (props.isFocused && !props.selectProps.hideHighlight) return '#6bdaf6'
  return 'var(--input-icon)'
}

const customStyles = {
  option: styles => ({
    ...styles,
    '&:active': {
      backgroundColor: '#e6e6e6'
    }
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontFamily: 'Gotham-Light'
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
    border: props.selectProps.hideHighlight && 'none !important'
  }),
  dropdownIndicator: (styles, props, state) => ({
    display: 'flex',
    padding: '8px',
    color: returnDropdownIndicatorColor(props),
    transform: props.selectProps.menuIsOpen && 'rotate(180deg)',
    opacity: props.isDisabled ? 0.6 : 1
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  valueContainer: (styles, props) => {
    const conditionalStyles = props.selectProps.settingsSelect
      ? {
          fontFamily: 'Gotham-Bold',
          fontSize: '14px',
          color: 'var(--settings-select-value-text) !important',
          textAlign: 'right',
          opacity: props.isDisabled ? 0.6 : 1
        }
      : {}
    return {
      ...styles,
      background: props.selectProps.transparent && 'transparent !important',
      fontSize: props.selectProps.fontSize,
      padding: !props.hideHighlight && '7px 15px !important',
      justifyContent: props.selectProps.settingsSelect && 'flex-end',
      ...conditionalStyles
    }
  },
  singleValue: (styles, props) => {
    const conditionalStyles = props.selectProps.settingsSelect
      ? {
          fontFamily: 'Gotham-Bold',
          fontSize: '14px',
          color: 'var(--settings-select-value-text) !important',
          textAlign: 'right'
        }
      : {}
    return {
      ...styles,
      fontSize: props.selectProps.fontSize,
      ...conditionalStyles
    }
  }
}

const StyledReactSelect = props => (
  <Select
    {...props}
    maxMenuHeight={140}
    styles={customStyles}
    className="react-select-container"
    classNamePrefix="react-select"
  />
)

export default StyledReactSelect
