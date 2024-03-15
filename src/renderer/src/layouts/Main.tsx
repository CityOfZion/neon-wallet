import { ComponentProps, ReactNode } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { PageLayout } from './Page'

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
    <PageLayout>
      <div className={StyleHelper.mergeStyles('flex h-screen w-screen', className)} {...props}>
        <Sidebar />

        <div className="h-full w-full flex flex-col bg-asphalt text-white px-7 pb-4 min-w-0 min-h-0">
          <header
            className={StyleHelper.mergeStyles(
              'border-b border-b-gray-300/30 h-[4.0625rem] flex justify-between items-center py-5',
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
    </PageLayout>
  )
}
