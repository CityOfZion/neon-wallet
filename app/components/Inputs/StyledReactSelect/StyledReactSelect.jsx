import React from 'react'
import Select from 'react-select'

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
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
    border:
      props.isFocused && props.selectProps.hideHighlight && 'none !important',
    background:
      props.isFocused &&
      props.selectProps.hideHighlight &&
      'transparent !important'
  })
}

const StyledReactSelect = props => (
  <Select
    {...props}
    styles={customStyles}
    className="react-select-container"
    classNamePrefix="react-select"
  />
)

export default StyledReactSelect
