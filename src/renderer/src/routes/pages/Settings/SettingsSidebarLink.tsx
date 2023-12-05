import { cloneElement } from 'react'
import { NavLink } from 'react-router-dom'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  icon: JSX.Element
  title: string
  to: string
  match?: boolean
}

export const SettingsSidebarLink = ({ icon, title, to, match }: TProps): JSX.Element => {
  return (
    <li className="my-3">
      <NavLink
        to={to}
        className={({ isActive }) => {
          return StyleHelper.mergeStyles('tab-button p-2 pl-3 w-full flex border-l-[0.1875rem] justify-content-end', {
            'border-l-neon bg-asphalt stroke-neon text-neon': isActive || match,
            'border-l-transparent cursor-pointer opacity-60 hover:border-l-neon hover:bg-asphalt hover:opacity-100 hover:stroke-neon hover:text-neon':
              !isActive && !match,
          })
        }}
      >
        {cloneElement(icon, {
          className: `w-5 h-5 object-contain`,
        })}

        <span className="ml-3 leading-5 text-white">{title}</span>
      </NavLink>
    </li>
  )
}
