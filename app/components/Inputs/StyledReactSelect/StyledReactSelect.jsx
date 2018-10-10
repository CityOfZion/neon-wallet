import React from 'react'
import Select from 'react-select'
import { omit } from 'lodash-es'

const returnDropdownIndicatorColor = props => {
  if (props.isFocused && !props.selectProps.hideHighlight) return '#6bdaf6'
  return '#9599a2'
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
    borderColor: props.selectProps.hideHighlight && 'transparent',
    border: props.selectProps.hideHighlight && 'none !important'
  }),
  dropdownIndicator: (styles, props, state) => ({
    display: 'flex',
    padding: '8px',
    color: returnDropdownIndicatorColor(props),
    transform: props.selectProps.menuIsOpen && 'rotate(180deg)'
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  valueContainer: (styles, props) => ({
    ...styles,
    background: props.selectProps.transparent && 'transparent !important',
    fontSize: props.selectProps.fontSize,
    padding: !props.hideHighlight && '7px 15px !important'
  })
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
