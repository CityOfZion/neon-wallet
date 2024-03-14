import { ComponentProps, ReactNode, useEffect, useRef } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { motion } from 'framer-motion'

export type TModalProps = {
  children?: ReactNode
  closeOnEsc?: boolean
  closeOnOutsideClick?: boolean
  contentClassName?: string
  onClose?: () => void
} & ComponentProps<'div'>

export const ModalLayout = ({
  closeOnEsc = true,
  closeOnOutsideClick = true,
  children,
  className,
  contentClassName,
  onClose,
}: TModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { modalNavigate } = useModalNavigate()

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }

  const handleModalClick = () => {
    if (!closeOnOutsideClick) return
    modalNavigate(-1)
    onClose?.()
  }

  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!closeOnEsc || event.key !== 'Escape') return
    modalNavigate(-1)
    onClose?.()
  }

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  return (
    <div
      className={StyleHelper.mergeStyles('fixed left-0 top-0 w-screen h-screen z-[1000]', className)}
      onClick={handleModalClick}
      onKeyDown={handleModalKeyDown}
      ref={containerRef}
      tabIndex={0}
    >
      <motion.div
        className="absolute bg-gray-900/50 backdrop-blur-sm top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <div
        onClick={handleContentClick}
        onKeyDown={handleModalKeyDown}
        className={StyleHelper.mergeStyles('relative', contentClassName)}
      >
        {children}
      </div>
    </div>
  )
}
