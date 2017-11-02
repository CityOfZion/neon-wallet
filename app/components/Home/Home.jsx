// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import Page from './Page'
import { ROUTES } from '../core/constants'

const Home = () =>
  <Page id='home'>
    <Link to={ROUTES.LOGIN_LOCAL_STORAGE}><div className='linkBox'>Login using a saved wallet</div></Link>
    <Link to={ROUTES.LOGIN_NEP2}><div className='linkBox'>Login using an encrypted key</div></Link>
    <Link to={ROUTES.LOGIN_PRIVATE_KEY}><div className='linkBox'>Login using a private key</div></Link>
    <Link to={ROUTES.LOGIN_LEDGER_NANO_S}><div className='linkBox'>Login using the Ledger Nano S</div></Link>
    <Link to={ROUTES.CREATE_WALLET}><div className='linkBox alt'>Create a new wallet</div></Link>
    <Link to={ROUTES.ENCRYPT_KEY}><div className='linkBox alt'>Encrypt an existing key</div></Link>
    <Link to={ROUTES.SETTINGS}><div className='linkBox alt'>Manage Neon settings</div></Link>
    <Link to={ROUTES.LOGIN_TOKEN_SALE}><div className='linkBox alt'>Participate in Token Sale</div></Link>
  </Page>

export default Home
