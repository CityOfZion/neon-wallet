import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight, TbStepOut } from 'react-icons/tb'
import { Separator } from '@renderer/components/Separator'

export const SelectToken = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })

  return (
    <Fragment>
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbStepOut className="text-blue w-5 h-5 mr-3 ml-1" />
          <span className="font-bold">{t('tokenToSend')}</span>
        </div>
        <div className="flex items-center">
          <span className="text-neon mr-3">{t('selectToken')}</span>
          <TbChevronRight className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      <div className="px-3">
        <Separator />
      </div>
    </Fragment>
  )
}
