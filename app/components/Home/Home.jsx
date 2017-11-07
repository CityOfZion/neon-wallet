// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../Page'
import { ROUTES } from '../../core/constants'
import styles from './Home.scss'
import classNames from 'classnames'

const Home = () =>
  <Page id='home' className={styles.container}>
    <Link to={ROUTES.LOGIN_LOCAL_STORAGE}>
      <div className={classNames('linkBox', styles.linkBox)}>Login using a saved wallet</div>
    </Link>
    <Link to={ROUTES.LOGIN_NEP2}>
      <div className={classNames('linkBox', styles.linkBox)}>Login using an encrypted key</div>
    </Link>
    <Link to={ROUTES.LOGIN_PRIVATE_KEY}>
      <div className={classNames('linkBox', styles.linkBox)}>Login using a private key</div>
    </Link>
    <Link to={ROUTES.LOGIN_LEDGER_NANO_S}>
      <div className={classNames('linkBox', styles.linkBox)}>Login using a Ledger</div>
    </Link>
    <Link to={ROUTES.CREATE_WALLET}>
      <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>Create a new wallet</div>
    </Link>
    <Link to={ROUTES.ENCRYPT_KEY}>
      <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>Encrypt an existing key</div>
    </Link>
    <Link to={ROUTES.SETTINGS}>
      <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>Manage Neon settings</div>
    </Link>
    {/* <Link to={ROUTES.LOGIN_TOKEN_SALE}>
      <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>Participate in Token Sale</div>
    </Link> */}
  </Page>

export default Home
