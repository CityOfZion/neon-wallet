// @flow
import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../modules/account'
import { Link } from 'react-router'
import Power from 'react-icons/lib/md/power-settings-new'
import ReactTooltip from 'react-tooltip'

type Props = {
  dispatch: DispatchType
}

let Logout = ({ dispatch }: Props) =>
  <div id='logout' data-tip data-for='logoutTip' onClick={() => dispatch(logout())}>
    <Link to='/'><Power /></Link>
    <ReactTooltip class='solidTip' id='logoutTip' place='bottom' type='dark' effect='solid'>
      <span>Logout</span>
    </ReactTooltip>
  </div>

export default connect()(Logout)
