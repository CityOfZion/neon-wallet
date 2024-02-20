import { ComponentProps, ReactNode } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { AppLayout } from './App'

export type TMainLayoutProps = {
  children?: ReactNode
  heading: JSX.Element | string
  rightComponent?: JSX.Element
  contentClassName?: string
  headerClassName?: string
} & ComponentProps<'div'>

export const MainLayout = ({
  heading,
  children,
  contentClassName,
  headerClassName,
  className,
  rightComponent,
  ...props
}: TMainLayoutProps): JSX.Element => {
  return (
    <AppLayout>
      <div className={StyleHelper.mergeStyles('flex h-screen w-screen', className)} {...props}>
        <Sidebar />

        <div className="h-full w-full flex flex-col bg-asphalt text-white px-7 py-4 min-w-0 min-h-0">
          <header
            className={StyleHelper.mergeStyles(
              'border-b border-b-gray-300/30 min-h-12  flex justify-between items-center pb-4',
              headerClassName
            )}
          >
            {typeof heading === 'string' ? <h1 className="text-sm font-bold">{heading}</h1> : heading}

            {rightComponent}
          </header>

          <main className={StyleHelper.mergeStyles('flex w-full flex-col flex-grow min-h-0 pt-5', contentClassName)}>
            {children}
          </main>
        </div>
      </div>
    </AppLayout>
  )
}
