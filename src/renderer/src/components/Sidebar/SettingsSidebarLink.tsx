import { cloneElement, useEffect, useState } from 'react'

export const SettingsSidebarLink = ({ id, icon, title, onClick, selectedId }): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(id === selectedId)

  const handleClick = () => {
    setIsActive(!isActive)
    onClick?.()
  }
  useEffect(() => {
    setIsActive(id === selectedId)
  }, [selectedId, id])

  return (
    <li className="my-3">
      <button
        onClick={() => handleClick()}
        className={`tab-button p-2 pl-3 w-full flex border-l-[3px] justify-content-end ${
          isActive
            ? 'border-l-neon bg-asphalt stroke-neon text-neon'
            : 'border-l-transparent cursor-pointer opacity-60 hover:border-l-neon hover:bg-asphalt hover:opacity-100 hover:stroke-neon hover:text-neon'
        }`}
      >
        {cloneElement(icon, {
          className: `w-5 h-5 object-contain`,
        })}

        <span className="ml-3 -mt-0.5 text-white">{title}</span>
      </button>
    </li>
  )
}
