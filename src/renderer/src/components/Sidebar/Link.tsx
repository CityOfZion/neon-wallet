import { cloneElement } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

type Props = {
  icon: JSX.Element
  title: string
  to: string
  disabled?: boolean
  isNew?: boolean
}

export const Link = ({ icon, title, to, disabled, isNew }: Props): JSX.Element => {
  const { t } = useTranslation('components', { keyPrefix: 'sidebar.link' })

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = event => {
    if (!disabled) return
    event.preventDefault()
  }

  return (
    <li>
      <NavLink
        to={to}
        onClick={handleClick}
        className={({ isActive }) => {
          return twMerge(
            'group text-white text-2xs flex flex-col justify-center items-center gap-1 py-2.5 w-full transition-color relative',
            isActive
              ? 'border-l-[3px] border-l-neon bg-asphalt shadow-inner-md pr-[3px]'
              : disabled
              ? 'bg-transparent opacity-40 cursor-not-allowed'
              : 'bg-transparent cursor-pointer opacity-60 hover:border-l-neon hover:border-l-[3px] hover:pr-[3px] hover:bg-asphalt hover:shadow-inner-md  hover:opacity-100'
          )
        }}
      >
        {cloneElement(icon, {
          className: 'group-aria-[current=page]:stroke-white stroke-gray-200 object-contain w-6 h-6',
        })}

        {isNew && (
          <div className="bg-neon rounded-full text-asphalt font-bold px-1 absolute top-2 right-[0.4rem]">
            {t('isNew')}
          </div>
        )}

        <span className="whitespace-nowrap">{title}</span>
      </NavLink>
    </li>
  )
}
