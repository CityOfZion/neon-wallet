import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { VscCircleFilled } from 'react-icons/vsc'

export const SendAmount = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })

  return (
    <Fragment>
      <div className="flex justify-between h-6 pt-4 px-3">
        <div className="flex items-center">
          <VscCircleFilled className="text-gray-300 w-2 h-2 mr-[1.09rem] ml-[0.65rem]" />
          {t('amount')}
        </div>
        <div className="flex items-center">
          <span className="text-gray-100 mr-3">0.00</span>
          <TbChevronRight className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      <div className="flex justify-between h-11 p-3">
        <span className="text-gray-100 pl-9 italic">{t('fiatValue')}</span>
        <span className="text-gray-100 mr-8">$0,000.00</span>
      </div>
    </Fragment>
  )
}
