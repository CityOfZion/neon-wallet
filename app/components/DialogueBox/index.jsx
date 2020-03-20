// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './DialogueBox.scss'

type Props = {
  icon: React$Node,
  className?: string,
  text?: string | React$Node,
  renderText?: () => React$Node,
}

const DialogueBox = ({ icon, text, renderText, className }: Props) => (
  <section className={classNames(styles.dialogueBox, className)}>
    {icon} {renderText && renderText()} {text}
  </section>
)

export default DialogueBox
