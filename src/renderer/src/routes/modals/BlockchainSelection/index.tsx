import { FormEvent, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { Checkbox } from '@renderer/components/Checkbox'
import { Separator } from '@renderer/components/Separator'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocation = {
  heading: string
  headingIcon?: JSX.Element
  description?: string
  subtitle?: string
  buttonLabel?: string
  withBackButton?: boolean
  onSelect?: (blockchain: TBlockchainServiceKey) => void
}

export const BlockchainSelectionModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'blockchaiinSelectionModal' })
  const { t: blockchainT } = useTranslation('common', { keyPrefix: 'blockchain' })
  const {
    heading,
    headingIcon,
    description,
    buttonLabel,
    onSelect,
    subtitle,
    withBackButton = true,
  } = useModalState<TLocation>()
  const { bsAggregator } = useBsAggregator()

  const [selectedBlockchain, setSelectedBlockchain] = useState<TBlockchainServiceKey | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedBlockchain) return
    onSelect?.(selectedBlockchain)
  }

  const handleCheckboxChange = (service: TBlockchainServiceKey) => {
    setSelectedBlockchain(service)
  }

  return (
    <EndModalLayout
      heading={heading}
      withBackButton={withBackButton}
      headingIcon={headingIcon}
      contentClassName="flex flex-col"
    >
      {subtitle && (
        <Fragment>
          <p className="text-gray-100 text-xs">{subtitle}</p>

          <Separator className="my-7" />
        </Fragment>
      )}

      <p>{description}</p>

      <form className="flex flex-col  flex-grow mt-6" onSubmit={handleSubmit}>
        <ul className="flex flex-col flex-grow gap-2.5">
          {(Object.keys(bsAggregator.blockchainServicesByName) as TBlockchainServiceKey[]).map((service, index) => (
            <li className="flex flex-row items-center justify-between h-12 rounded bg-asphalt p-5" key={index}>
              <div className="flex flex-row gap-x-2">
                <BlockchainIcon blockchain={service} type="white" className="opacity-60" />
                {blockchainT(service)}
              </div>

              <Checkbox
                onCheckedChange={() => handleCheckboxChange(service)}
                checked={selectedBlockchain === service}
              />
            </li>
          ))}
        </ul>

        <Button
          className="mt-8"
          type="submit"
          label={buttonLabel ?? t('buttonContinueLabel')}
          flat
          disabled={!selectedBlockchain}
        />
      </form>
    </EndModalLayout>
  )
}
