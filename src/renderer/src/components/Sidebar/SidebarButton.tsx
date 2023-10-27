import React, { cloneElement } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type Props = {
  icon: JSX.Element
  title: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const SidebarButton = ({ icon, title, onClick, disabled }: Props): JSX.Element => {
  return (
    <li>
      <button
        onClick={onClick}
        className={StyleHelper.mergeStyles(
          'text-white text-2xs flex flex-col justify-center items-center gap-1 py-2.5 w-full transition-colors relative',
          {
            'bg-transparent opacity-40 cursor-not-allowed': disabled,
            'bg-transparent cursor-pointer opacity-60 hover:border-l-neon hover:border-l-[3px] hover:pr-[3px] hover:bg-asphalt hover:shadow-inner-md  hover:opacity-100':
              !disabled,
          }
        )}
      >
        {cloneElement(icon, {
          className: 'stroke-gray-200 object-contain w-6 h-6',
        })}

        <span className="whitespace-nowrap">{title}</span>
      </button>
    </li>
  )
}
