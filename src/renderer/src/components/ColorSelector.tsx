import { useTranslation } from 'react-i18next'
import { MdAdd } from 'react-icons/md'
import { TbCircleCheck } from 'react-icons/tb'
import { TAccountColorKey } from '@renderer/@types/blockchain'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  label: string
  accountColor: string
  setNewColor: (color: string) => void
}

const accountColorToSelect: string[] = ['green', 'blue', 'purple', 'magenta', 'orange', 'yellow', 'gray']
const gradientByAccountColor: Record<TAccountColorKey, string> = {
  blue: 'from-[#242171] to-[#919BED]',
  green: 'from-[#164C55] to-[#63D5D0]',
  gray: 'from-[#324C5F] to-[#9ABED3]',
  magenta: 'from-[#4C2F71] to-[#BB9EE4]',
  yellow: 'from-[#BDA133] to-[#FEDD5B]',
  purple: 'from-[#2F008E] to-[#7C4BFE]',
  orange: 'from-[#B44D00] to-[#FE872F]',
}

export const ColorSelector = ({ label, accountColor, setNewColor }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'colorSelector' })

  const handleChangeColor = (val: string) => {
    setNewColor(val)
  }

  return (
    <div>
      <div className="text-gray-300 uppercase text-xs font-bold mt-4 mb-4">{label}</div>
      <div className="flex-wrap grid grid-cols-4 gap-4">
        {accountColorToSelect.map(color => (
          <div
            key={color}
            onClick={() => handleChangeColor(color)}
            className={StyleHelper.mergeStyles(
              'w-12 h-12 bg-gradient-to-t rounded-lg flex justify-center items-center',
              gradientByAccountColor[color],
              'shadow-[9px_9px_11px_0px_rgba(0,0,0,0.3),-9px_-9px_11px_0px_rgba(55,63,71,0.49),inset_0px_1px_0px_0px_rgba(214,210,210,0.14),inset_-1px_-1px_0px_0px_rgba(0,0,0,0.39)]',
              {
                'border border-white': accountColor == color,
              }
            )}
          >
            {accountColor == color && <TbCircleCheck className="stroke-white w-6 h-6" />}
          </div>
        ))}
        <div className="border border-gray-300 text-gray-300 border-dashed w-12 h-12 flex flex-col justify-center items-center">
          <MdAdd className="text-xl" />
          <div className="text-2xs leading-[0.5rem] text-center font-bold">{t('customColor')}</div>
        </div>
      </div>
    </div>
  )
}
