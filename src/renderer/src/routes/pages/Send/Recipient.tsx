import { useTranslation } from 'react-i18next'
import { TbStepInto, TbUsers } from 'react-icons/tb'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'

export const Recipient = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })

  return (
    <div className="bg-gray-300 bg-opacity-30 flex flex-col w-[30rem] rounded mt-2">
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbStepInto className="text-blue w-5 h-5 mr-3 ml-1" />
          <span>{t('recipientAddress')}</span>
        </div>
        <div className="flex items-center">
          <TbUsers className="w-5 h-5 text-neon mr-1" />
          <span className="text-neon">{t('contacts')}</span>
        </div>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <div className="py-4">
        <Input className="w-[24rem] mx-auto" compacted placeholder={t('addressInputHint')} />
      </div>
    </div>
  )
}
