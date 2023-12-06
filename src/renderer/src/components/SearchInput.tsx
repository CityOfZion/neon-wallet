import { TbSearch } from 'react-icons/tb'

import { Input, TInputProps } from './Input'

export const SearchInput = (props: TInputProps) => {
  return <Input {...props} leftIcon={<TbSearch className="stroke-neon" />} clearable />
}
