import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { BlockchainSelection } from '@renderer/components/BlockchainSelection'
import { Button } from '@renderer/components/Button'
import { useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocation = {
  heading: string
  headingIcon?: JSX.Element
  description?: string
  buttonLabel?: string
  onSelect?: (blockchain: TBlockchainServiceKey) => void
}

export const BlockchainSelectionModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'blockchaiinSelectionModal' })
  const { heading, headingIcon, description, buttonLabel, onSelect } = useModalState<TLocation>()

  const [selectedBlockchain, setSelectedBlockchain] = useState<TBlockchainServiceKey | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedBlockchain) return
    onSelect?.(selectedBlockchain)
  }

  return (
    <EndModalLayout heading={heading} withBackButton headingIcon={headingIcon} contentClassName="flex flex-col">
      <p>{description}</p>

      <form className="flex flex-col justify-between flex-grow" onSubmit={handleSubmit}>
        <BlockchainSelection className="mt-6" selected={selectedBlockchain} onSelect={setSelectedBlockchain} />

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
