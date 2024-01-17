import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { VscCircleFilled } from 'react-icons/vsc'
import { Separator } from '@renderer/components/Separator'

export const SelectAccount = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })

  return (
    <Fragment>
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <VscCircleFilled className="text-gray-300 w-2 h-2 mr-[1.09rem] ml-[0.65rem]" />
          {t('sourceAccount')}
        </div>
        <div className="flex items-center">
          <span className="text-gray-100 mr-3">{t('selectAccount')}</span>
          <TbChevronRight className="w-5 h-5 text-gray-300" />
        </div>
      </div>
      <div className="px-3">
        <Separator />
      </div>
    </Fragment>
  )
}
