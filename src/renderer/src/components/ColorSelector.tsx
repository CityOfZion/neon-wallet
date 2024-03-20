import { MdAdd } from 'react-icons/md'
import { TbCircleCheckFilled } from 'react-icons/tb'
import { accountColorsKeys, backgroundColorByAccountColor } from '@renderer/constants/blockchain'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  label: string
  accountColor: string
  setNewColor: (color: string) => void
}

export const ColorSelector = ({ label, accountColor, setNewColor }: TProps) => {
  return (
    <div>
      <div className="text-gray-300 uppercase text-xs font-bold mt-4 mb-4">{label}</div>
      <div className="flex-wrap grid grid-cols-4 gap-4">
        {accountColorsKeys.map(color => (
          <div
            key={color}
            onClick={() => setNewColor(color)}
            className={StyleHelper.mergeStyles(
              'w-15 h-15 rounded flex justify-center items-center',
              backgroundColorByAccountColor[color],
              'shadow-[4px_2px_4px_0px_rgba(0,0,0,0.3),-9px_-9px_11px_0px_rgba(55,63,71,0.49),inset_1px_1px_0px_0px_rgba(214,210,210,0.14),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.39)]'
            )}
          >
            <div className="w-14 h-14 bg-gradient-to-b from-transparent via-[#4F4F4F15] to-[#5E5E5E20] flex justify-center items-center">
              {accountColor == color && <TbCircleCheckFilled className="stroke-white w-6 h-6" />}
            </div>
          </div>
        ))}
        <div className="border border-gray-300 text-gray-300 border-dashed w-15 h-15 flex flex-col justify-center items-center">
          <MdAdd className="text-2xl" />
        </div>
      </div>
    </div>
  )
}
