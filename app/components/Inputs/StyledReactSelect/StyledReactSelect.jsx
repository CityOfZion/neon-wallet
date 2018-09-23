import React from 'react'
import Select from 'react-select'

import styles from './StyledReactSelect.scss'

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    '&:active': {
      backgroundColor: '#8d98ae',
      color: 'white'
    }
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontFamily: 'Gotham-Light'
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
