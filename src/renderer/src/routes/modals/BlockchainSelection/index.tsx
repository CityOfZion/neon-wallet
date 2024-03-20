import { FormEvent, Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { RadioGroup } from '@renderer/components/RadioGroup'
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

  const [selectedBlockchain, setSelectedBlockchain] = useState<TBlockchainServiceKey>('neo3')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedBlockchain) return
    onSelect?.(selectedBlockchain)
  }

  const handleSelectRadioItem = (service: TBlockchainServiceKey) => {
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
          <RadioGroup.Root value={selectedBlockchain} onValueChange={handleSelectRadioItem}>
            {(Object.keys(bsAggregator.blockchainServicesByName) as TBlockchainServiceKey[]).map((service, index) => (
              <RadioGroup.Item
                containerClassname="h-12 rounded bg-asphalt p-5 border-none mb-2.5"
                key={index}
                value={service}
                label={blockchainT(service)}
                leftIcon={<BlockchainIcon blockchain={service} type="gray" />}
              />
            ))}
          </RadioGroup.Root>
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
