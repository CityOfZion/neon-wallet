// @flow
import React from 'react'
import styles from './Footer.scss'
import { shell } from 'electron'

const discordInviteLink = 'https://discordapp.com/invite/R8v48YA'
const openDiscordLink = () => shell.openExternal(discordInviteLink)

const Footer = () => <div className={styles.container}>Community Support: <a href='#' onClick={openDiscordLink}>{discordInviteLink}</a> | Created by CoZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>

export default Footer
