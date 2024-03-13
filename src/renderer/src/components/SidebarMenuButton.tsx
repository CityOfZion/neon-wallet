import { MdChevronRight } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  title: string
  to?: string
  match?: boolean
}

const buildClassName = (isActive: boolean, match?: boolean) => {
  return StyleHelper.mergeStyles('px-4 w-full flex border-l-[0.1875rem] justify-between py-3.5 items-center', {
    'border-l-neon bg-asphalt stroke-neon': isActive || match,
    'border-l-transparent cursor-pointer opacity-60 hover:border-l-neon hover:bg-asphalt hover:opacity-100 hover:stroke-neon hover:text-neon':
      !isActive && !match,
  })
}

export const SidebarMenuButton = ({ title, to, match }: TProps): JSX.Element => {
  return (
    <li>
      <NavLink to={to ?? ''} className={({ isActive }) => buildClassName(isActive, match)}>
        <span className="text-xs text-white">{title}</span>
        <MdChevronRight className="text-gray-100 w-6 h-6" />
      </NavLink>
      <div className="px-4">
        <Separator />
      </div>
    </li>
  )
}
