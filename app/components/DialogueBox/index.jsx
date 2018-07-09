// @flow

import React, { ReactElement } from 'react'

import styles from './DialogueBox.scss'

type Props = {
  icon: ReactElement,
  text: string
}

const DialogueBox = ({ icon, text }: Props) => (
  <section className={styles.dialogueBox}>
    {icon} {text}
  </section>
)

export default DialogueBox
