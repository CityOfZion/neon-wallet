import { Fragment } from 'react'
import { BiSolidDownArrow, BiSolidSortAlt, BiSolidUpArrow } from 'react-icons/bi'

type TSortIconProps = {
  selected: boolean | null
}

export const SortIcon = ({ selected }: TSortIconProps) => {
  return (
    <Fragment>
      {selected === null && <BiSolidSortAlt className="text-gray-300" />}
      {selected === false && <BiSolidDownArrow className="text-gray-200" />}
      {selected && <BiSolidUpArrow className="text-gray-200" />}
    </Fragment>
  )
}
