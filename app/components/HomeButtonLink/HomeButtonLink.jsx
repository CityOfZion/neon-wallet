// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../core/constants'
import Button from '../Button'

const HomeButtonLink = () =>
  <Link to={ROUTES.HOME}><Button secondary>Home</Button></Link>

export default HomeButtonLink
