import { useTranslation } from 'react-i18next'
import { MdChevronRight, MdLaunch } from 'react-icons/md'
import { TbArrowsSort } from 'react-icons/tb'
import { ContractInvocation, TSession } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { Separator } from '@radix-ui/react-select'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { IconButton } from '@renderer/components/IconButton'
import { Loader } from '@renderer/components/Loader'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { useContract } from '@renderer/hooks/useContract'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'

type TProps = {
  invocation: ContractInvocation
  session: TSession
  blockchain: TBlockchainServiceKey
}

export const Invocation = ({ invocation, session, blockchain }: TProps) => {
  const { networkType } = useNetworkTypeSelector()
  const { data, isLoading } = useContract({ blockchain, hash: invocation.scriptHash })
  const { modalNavigateWrapper } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.neo3.contractInvocation' })

  const handleHashClick = () => {
    window.open(DoraHelper.buildContractUrl(invocation.scriptHash, networkType), '_blank')
  }

  return (
    <div className="px-4 pt-3 pb-5 bg-asphalt text-gray-100 rounded w-full text-sm">
      <div className="flex justify-between items-center">
        <div className="flex gap-2.5 items-center">
          <TbArrowsSort className="w-6 h-6 rotate-90 text-blue" />
          <p className="capitalize text-white">{invocation.operation}</p>
        </div>

        <div className="flex items-center gap-3">
          {isLoading ? <Loader className="w-4 h-4" /> : data && <p className="capitalize">{data.name}</p>}

          <IconButton
            icon={<MdChevronRight className="text-gray-100" />}
            compacted
            onClick={modalNavigateWrapper('dapp-permission-contract-details', {
              state: {
                session,
                hash: invocation.scriptHash,
                operation: invocation.operation,
                blockchain,
                values: invocation.args?.map(arg => arg.value) ?? [],
              },
            })}
          />
        </div>
      </div>

      <Separator className="mt-3 mb-4" />

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold">{t('hashLabel')}</span>

        <div className="flex justify-between pr-4 pl-5 bg-gray-700/60 py-2.5 rounded min-w-0 gap-3">
          <p className="truncate">{invocation.scriptHash}</p>
          <IconButton icon={<MdLaunch className="text-neon" />} compacted onClick={handleHashClick} />
        </div>
      </div>
    </div>
  )
}
