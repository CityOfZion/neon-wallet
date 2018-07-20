// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './DialogueBox.scss'

type Props = {
  icon: React$Node,
  className?: string,
  text: string
}

const DialogueBox = ({ icon, text, className }: Props) => (
  <section className={classNames(styles.dialogueBox, className)}>
    {icon} {text}
  </section>
)

export default DialogueBox
