import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineSave } from 'react-icons/md'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

export const SettingsBackupWallet = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings.backupWallet' })
  const { modalNavigateWrapper } = useModalNavigate()

  const [selectedFilePath, setSelectedFilePath] = useState<string>('')

  const handlePathSelectionButton = async () => {
    const result = await window.api.openDialog()
    setSelectedFilePath(result[0])
  }

  return (
    <div className=" flex flex-col px-5 w-full h-full items-center justify-between">
      <div className="flex flex-col w-full">
        <header className="w-full h-[3.25rem] border-b border-gray-300/30 items-center flex justify-between">
          <h1 className="text-white text-sm">{t('title')}</h1>
        </header>

        <div className="my-7 text-xs">{t('description')}</div>

        <div className="uppercase text-gray-100 font-bold text-xs mb-3.5">{t('saveBackupLabel')}</div>

        <div className="flex flex-col gap-y-10 max-w-[29rem]">
          <div className="flex gap-2.5">
            <Input value={selectedFilePath} compacted readOnly className="text-gray-100" />

            <Button flat label={t('browse')} onClick={handlePathSelectionButton} className="w-36" />
          </div>
          <Banner type="info" message={t('warning')} />
        </div>
      </div>
      <Button
        label={t('backup')}
        leftIcon={<MdOutlineSave />}
        iconsOnEdge={false}
        disabled={!selectedFilePath}
        onClick={modalNavigateWrapper('confirm-password-backup', { state: { selectedFilePath } })}
        className="w-52 mb-10"
      />
    </div>
  )
}
