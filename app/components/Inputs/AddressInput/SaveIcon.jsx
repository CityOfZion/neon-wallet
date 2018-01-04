// @flow
import React from 'react'
import { noop, trim } from 'lodash'

import Tooltip from '../../Tooltip'
import Button from '../../Button'
import Save from 'react-icons/lib/md/save'

import styles from './SaveIcon.scss'

type Props = {
  onSave?: Function
}

type State = {
  saving: boolean,
  name: string
}

export default class AddressInput extends React.Component<Props, State> {
  static defaultProps = {
    onSave: noop
  }

  state = {
    saving: false,
    name: ''
  }

  render = () => {
    return (
      <Tooltip
        className={styles.saveTooltip}
        interactive
        position='left'
        trigger='manual'
        open={this.state.saving}
        html={this.renderTooltip()}
        onRequestClose={this.handleToggle}>
        <Tooltip title='Save to Address Book' position='top'>
          <Save className={styles.saveIcon} tabIndex={0} onClick={this.handleClickIcon} />
        </Tooltip>
      </Tooltip>
    )
  }

  renderTooltip = () => {
    return (
      <div className={styles.saveForm}>
        <label className={styles.label}>Address Name:</label>
        <input
          className={styles.input}
          type='text'
          placeholder='Enter a name for this address'
          value={this.state.name}
          onChange={this.handleChange} />
        <Button
          className={styles.button}
          onClick={this.handleSave}>
          Save to Address Book
        </Button>
      </div>
    )
  }

  handleClickIcon = () => {
    // We need to short-circuit handling the click event on the icon so that it doesn't interfere
    // with the Tooltip onRequestClose prop.  Otherwise, if the user clicks the save icon while the
    // tooltip is already open, then it closes and immediately re-opens, effectively staying open.
    if (!this.state.saving) {
      this.handleToggle()
    }
  }

  handleToggle = () => {
    this.setState({ saving: !this.state.saving, name: '' })
  }

  handleChange = (event: Object) => {
    this.setState({ name: event.target.value })
  }

  handleSave = () => {
    const { onSave } = this.props
    const { name } = this.state
    if (onSave) {
      onSave(trim(name))
    }
  }
}
