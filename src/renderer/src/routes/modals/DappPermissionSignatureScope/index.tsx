import { useTranslation } from 'react-i18next'
import { TSession } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { DappPermissionHeader } from '@renderer/components/DappPermissionHeader'
import { useModalState } from '@renderer/hooks/useModalRouter'
import { CenterModalLayout } from '@renderer/layouts/CenterModal'

type TModalState = {
  session: TSession
  scope: string
  allowedList?: string[]
}

export const DappPermissionSignatureScopeModal = () => {
  const { session, scope, allowedList } = useModalState<TModalState>()
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermissionSignatureScopeModal' })

  return (
    <CenterModalLayout contentClassName="px-0 flex flex-col pb-5 min-h-0">
      <div className="flex flex-col min-h-0 overflow-y-auto pr-2 pl-5">
        <DappPermissionHeader session={session} />

        <p className="text-center text-white text-2xl mt-9 mb-6">Signature scope</p>

        <div className="text-gray-100 text-sm flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">SCOPE</span>

            <div className="flex justify-between px-5 bg-asphalt py-2.5 rounded min-w-0 gap-3">
              <p className="break-words min-w-0">{scope}</p>
            </div>
          </div>

          {allowedList && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold">ALLOWED LIST</span>

              <div className="flex justify-between px-5 bg-asphalt py-2.5 rounded min-w-0 gap-3">
                <p className="break-words min-w-0">{allowedList?.join(',\r\n')}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">EXPLANATION</span>

            <div className="flex justify-between px-5 bg-asphalt py-2.5 rounded min-w-0 gap-3">
              <p className="break-words min-w-0">{t(`scopes.${scope}` as unknown as TemplateStringsArray)}</p>
            </div>
          </div>
        </div>
      </div>
    </CenterModalLayout>
  )
}
