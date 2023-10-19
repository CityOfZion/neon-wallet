import { ComponentProps } from 'react'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as NeonWalletFull } from '@renderer/assets/images/neon-wallet-full.svg'
import { IconButton } from '@renderer/components/IconButton'
import { twMerge } from 'tailwind-merge'

type Props = { bigger?: boolean; title: string; withBackButton?: boolean } & ComponentProps<'div'>

export const WelcomeLayout = ({ bigger, children, title, withBackButton, ...props }: Props) => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="w-screen h-screen bg-asphalt flex justify-center items-center">
      <div
        className={twMerge(
          'w-full h-full bg-gray-800 max-h-[614px] flex flex-col items-center pb-10 pt-11 px-16 rounded relative',
          bigger ? 'max-w-[930px]' : 'max-w-[512px]'
        )}
        {...props}
      >
        {withBackButton && (
          <IconButton icon={<MdArrowBack />} className="absolute top-5 left-5" size="md" onClick={handleBack} />
        )}
        <NeonWalletFull />
        <h1 className="mt-6 text-2xl text-white">{title}</h1>
        {children}
      </div>
    </div>
  )
}
