import { Fragment } from 'react'
import { TestnetBanner } from '@renderer/components/TestnetBanner'

type TProps = {
  children: React.ReactNode
}

export const AppLayout = (props: TProps) => {
  return (
    <Fragment>
      <TestnetBanner />
      {props.children}
    </Fragment>
  )
}
