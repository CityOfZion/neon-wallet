import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdContentCopy } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { DappPermissionHeader } from '@renderer/components/DappPermissionHeader'
import { IconButton } from '@renderer/components/IconButton'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'

import { TDappPermissionComponentProps } from '..'

type TProps = TDappPermissionComponentProps & {
  successHeading: string
  successSubtitle: string
  successContent?: (props: any) => JSX.Element
  title: string
}

export const EthereumRawJsonDappPermission = ({
  session,
  onAccept,
  onReject,
  request,
  successHeading,
  title,
  successSubtitle,
  successContent,
}: TProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.ethereum.rawJson' })

  const [isApproving, setIsApproving] = useState(false)

  const array = request.params.request.params.map((item: any) => {
    try {
      return JSON.parse(item)
    } catch {
      return item
    }
  })

  const json = JSON.stringify(array, null, 4)

  const handleAccept = async () => {
    setIsApproving(true)
    await onAccept(successHeading, successSubtitle, successContent)
    setIsApproving(false)
  }

  return (
    <div className="flex flex-col flex-grow min-h-0 overflow-y-auto pr-2 pl-5">
      <DappPermissionHeader session={session} />

      <div className="flex flex-col items-center">
        <p className="text-white text-2xl mt-9 text-center">{title}</p>
      </div>

      <div className="mt-8 flex flex-col gap-1 text-xs w-full text-gray-100 flex-grow">
        <span className="font-bold">{t('dataLabel')}</span>
        <div className=" bg-asphalt w-full p-2 rounded break-words whitespace-pre-wrap max-h-48 overflow-y-auto relative">
          {json}

          <IconButton
            className="absolute top-2 right-2"
            icon={<MdContentCopy className="text-neon" />}
            compacted
            onClick={UtilsHelper.copyToClipboard.bind(null, json)}
          />
        </div>
      </div>

      <div className="flex gap-2.5 px-10 mt-8 pb-10 z-50 ">
        <Button label={t('cancelButtonLabel')} colorSchema="gray" onClick={onReject} />

        <Button
          label={t('acceptButtonLabel')}
          className="flex-grow"
          onClick={handleAccept}
          loading={isApproving}
          disabled={isApproving}
        />
      </div>
    </div>
  )
}
