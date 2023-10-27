import { ComponentProps } from 'react'
import { Sidebar } from '@renderer/components/Sidebar'
import { twMerge } from 'tailwind-merge'

type Props = {
  children?: React.ReactNode
  title: string | JSX.Element
  rightComponent?: JSX.Element
  contentClassName?: string
} & ComponentProps<'div'>

export const MainLayout = ({
  title,
  children,
  contentClassName,
  className,
  rightComponent,
  ...props
}: Props): JSX.Element => {
  return (
    <div className={twMerge('flex', className)} {...props}>
      <Sidebar />
      <div className="flex-grow flex flex-col bg-asphalt text-white px-7 py-4">
        <header className="border-b border-b-gray-mid/30 h-12 flex justify-between items-center pb-4">
          {typeof title === 'string' ? <h1 className="text-sm font-bold">{title}</h1> : title}

          {rightComponent}
        </header>

        <main className={twMerge('flex flex-col flex-grow py-5', contentClassName)}>{children}</main>
      </div>
    </div>
  )
}
