import { ComponentProps } from 'react'
import { ReactComponent as NeonWalletFull } from '@renderer/assets/images/neon-wallet-full.svg'
import { twMerge } from 'tailwind-merge'

type Props = { bigger?: boolean; title: string } & ComponentProps<'div'>

export const WelcomeLayout = ({ bigger, children, title, ...props }: Props) => {
  return (
    <div className="w-screen h-screen bg-asphalt flex justify-center items-center">
      <div
        className={twMerge(
          'w-full h-full bg-grey-darker max-h-[614px] rounded',
          bigger ? 'max-w-[930px]' : 'max-w-[512px]',
          'flex flex-col items-center pb-10 pt-11'
        )}
        {...props}
      >
        <NeonWalletFull />

        <h1 className="mt-6 text-2xl text-white">{title}</h1>

        {children}
      </div>
    </div>
  )
}
