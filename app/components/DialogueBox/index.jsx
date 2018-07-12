// @flow

import React, { ReactElement } from 'react'

import classNames from 'classnames'

import styles from './DialogueBox.scss'

type Props = {
  icon: ReactElement,
  className?: string,
  text: string
}

const DialogueBox = ({ icon, text, className }: Props) => (
  <section className={classNames(styles.dialogueBox, className)}>
    {icon} {text}
  </section>
)

export default DialogueBox
