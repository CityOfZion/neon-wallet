// @flow
import React from 'react'
import Logo from './Logo'
import Footer from './Footer'

type Props = {
    children: React$Node,
    id: string,
}

const Page = ({ id, children }: Props) =>
  <div id={id}>
    <Logo />
    {children}
    <Footer />
  </div>

export default Page
