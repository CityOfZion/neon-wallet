import { useTranslation } from 'react-i18next'
import { TbReceipt } from 'react-icons/tb'

type TTotalFeeParams = {
  totalFee: string
}

export const TotalFee = ({ totalFee }: TTotalFeeParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })

  return (
    <div className="flex justify-between my-2.5">
      <div className="flex items-center gap-3">
        <TbReceipt className="text-blue w-5 h-5" />
        <span>{t('totalFee')}</span>
      </div>

      <div className="flex items-center">
        <span className="text-gray-100">{totalFee}</span>
      </div>
    </div>
  )
}
