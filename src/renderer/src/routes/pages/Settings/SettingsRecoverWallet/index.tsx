import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbReload } from 'react-icons/tb'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { BACKUP_FILE_EXTENTION } from '@renderer/constants/backup'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

export const SettingsRecoverWallet = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings.recoverWallet' })
  const { modalNavigateWrapper } = useModalNavigate()

  const [selectedFilePath, setSelectedFilePath] = useState<string>('')
  const [fileContent, setFileContent] = useState<string>()

  const handlePathSelectionButton = async () => {
    const [filePath] = await window.api.openDialog({
      properties: ['openFile'],
      filters: [{ name: t('nameExtention'), extensions: [BACKUP_FILE_EXTENTION] }],
    })
    setSelectedFilePath(filePath)
    const content = await window.api.readFile(filePath)
    setFileContent(content)
  }

  return (
    <div className=" flex flex-col px-5 w-full h-full items-center justify-between">
      <div className="flex flex-col w-full">
        <header className="w-full h-[3.25rem] border-b border-gray-300/30 items-center flex justify-between">
          <h1 className="text-white text-sm">{t('title')}</h1>
        </header>

        <div className="my-7 text-xs">{t('description')}</div>

        <div className="uppercase text-gray-100 font-bold text-xs mb-3.5">{t('saveBackupLabel')}</div>

        <div className="flex flex-col gap-y-0.5 max-w-[29rem]">
          <div className="flex gap-2.5">
            <Input className="text-gray-100" value={selectedFilePath} compacted readOnly />

            <Button flat label={t('browse')} onClick={handlePathSelectionButton} className="w-36" />
          </div>
        </div>
      </div>
      <Button
        label={t('backup')}
        leftIcon={<TbReload />}
        iconsOnEdge={false}
        onClick={modalNavigateWrapper('confirm-password-recover', { state: { fileContent } })}
        className="w-52 mb-10"
      />
    </div>
  )
}
