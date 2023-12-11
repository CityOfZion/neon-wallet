import { ComponentProps } from 'react'
import { MdClose, MdKeyboardBackspace } from 'react-icons/md'
import { IconButton } from '@renderer/components/IconButton'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { motion } from 'framer-motion'

import { ModalLayout, TModalProps } from './Modal'

type TProps = {
  contentClassName?: string
  withBackButton?: boolean
} & ComponentProps<'div'> &
  TModalProps

export const CenterModalLayout = ({
  children,
  withBackButton,
  contentClassName,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  onClose,
}: TProps) => {
  const { modalNavigate } = useModalNavigate()

  const handleClose = () => {
    modalNavigate(-1)
    onClose?.()
  }

  return (
    <ModalLayout
      closeOnEsc={closeOnEsc}
      closeOnOutsideClick={closeOnOutsideClick}
      onClose={onClose}
      className="flex justify-center items-center"
    >
      <motion.div
        transition={{ duration: 0.1 }}
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.95,
          opacity: 0,
        }}
      >
        <div className="bg-gray-800 rounded-md w-[32rem] h-[38.75rem] px-4 flex flex-col">
          <header
            className={StyleHelper.mergeStyles('flex items-center pt-5', {
              'justify-between': withBackButton,
              'justify-end': !withBackButton,
            })}
          >
            {withBackButton && (
              <IconButton
                icon={<MdKeyboardBackspace className="fill-gray-200" />}
                size="md"
                compacted
                onClick={handleClose}
              />
            )}

            <IconButton icon={<MdClose className="fill-white" />} size="md" compacted onClick={handleClose} />
          </header>

          <main className={StyleHelper.mergeStyles('flex-grow px-9 pb-10 pt-2.5', contentClassName)}>{children}</main>
        </div>
      </motion.div>
    </ModalLayout>
  )
}
