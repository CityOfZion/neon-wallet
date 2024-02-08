import { useTranslation } from 'react-i18next'
import { TbReceipt } from 'react-icons/tb'

type TTotalFeeParams = {
  totalFee: string
}

export const TotalFee = ({ totalFee }: TTotalFeeParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })

  return (
    <div className="bg-gray-300 bg-opacity-30 flex flex-col w-[30rem] rounded mt-2">
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbReceipt className="text-blue w-5 h-5 mr-3 ml-1" />
          <span>{t('totalFee')}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-100">{totalFee}</span>
        </div>
      </div>
    </div>
  )
}
