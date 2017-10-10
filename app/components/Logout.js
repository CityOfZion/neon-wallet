import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../modules/account'
import { Link } from 'react-router'
import Power from 'react-icons/lib/md/power-settings-new'
import ReactTooltip from 'react-tooltip'

let Logout = ({ dispatch }) =>
  <div id='logout' data-tip data-for='logoutTip' onClick={() => dispatch(logout())}>
    <Link to='/'><Power /></Link>
    <ReactTooltip class='solidTip' id='logoutTip' place='bottom' type='dark' effect='solid'>
      <span>Logout</span>
    </ReactTooltip>
  </div>

const mapStateToProps = (state) => ({
})

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired
}

Logout = connect(mapStateToProps)(Logout)

export default Logout
