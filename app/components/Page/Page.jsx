// @flow
import React from 'react'
import type { Children } from 'react'
import Logo from '../Logo'
import Footer from '../Footer'

type Props = {
    children: Children,
    id?: string,
    className?: string
}

const Page = ({ id, className = '', children }: Props) =>
  <div id={id} className={className}>
    <Logo />
    {children}
    <Footer />
  </div>

export default Page
