// @flow
import React from 'react'
import { Link } from 'react-router'
import Logo from './Logo'
import Footer from './Footer'

const Home = () =>
  <div id='home'>
    <Logo />
    <Link to='/LoginLocalStorage'><div className='linkBox'>Login using a saved wallet</div></Link>
    <Link to='/LoginEncrypted'><div className='linkBox'>Login using an encrypted key</div></Link>
    <Link to='/LoginPrivateKey'><div className='linkBox'>Login using a private key</div></Link>
    <Link to='/LoginLedgerNanoS'><div className='linkBox'>Login using the Ledger Nano S</div></Link>
    <Link to='/create'><div className='linkBox alt'>Create a new wallet</div></Link>
    <Link to='/encryptKey'><div className='linkBox alt'>Encrypt an existing key</div></Link>
    <Link to='/settings'><div className='linkBox alt'>Manage Neon settings</div></Link>
    <Link to='/LoginTokenSale'><div className='linkBox alt'>Participate in Token Sale</div></Link>
    <Footer />
  </div>

export default Home
