// @flow
import React from 'react'
import Logo from '../Logo'
import Footer from '../Footer'

type Props = {
    children: React$Node,
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
