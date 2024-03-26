import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdLooksTwo } from 'react-icons/md'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { CreateWalletModalLayout } from '@renderer/layouts/CreateWalletModalLayout'
import _ from 'lodash'

type TLocationState = {
  words: string[]
}

export const CreateWalletStep2Modal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'createWallet.step2' })
  const { words } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()

  const shuffledWords = useMemo(() => _.shuffle(words), [words])
  const [pressedWords, setPressedWords] = useState<string[]>([])

  const isActive = (word: string) => pressedWords.some(pressedWord => pressedWord === word)

  const isDisabled = () => pressedWords.length !== shuffledWords.length

  const handlePress = (word: string) => {
    const isWordActive = isActive(word)

    setPressedWords(prevState => (isWordActive ? prevState.filter(state => state !== word) : [...prevState, word]))
  }

  const validateAndNext = async () => {
    if (pressedWords.join() !== words.join()) {
      ToastHelper.error({ message: t('tryAgain') })
      setPressedWords([])
      return
    }

    modalNavigate('create-wallet-step-3', { state: { words } })
  }

  return (
    <CreateWalletModalLayout>
      <header className="flex justify-between items-center py-2.5">
        <div className="flex items-center gap-x-2.5">
          <MdLooksTwo className="text-blue h-4.5 w-4.5" />
          <h2 className="text-sm">{t('title')}</h2>
        </div>
        <div className="text-blue text-sm">{t('step2of3')}</div>
      </header>
      <Separator className="min-h-[0.0625rem] mb-9" />
      <div className="flex flex-col items-center w-full h-[84%] justify-between">
        <div className="flex flex-col w-full gap-6">
          <div className="text-gray-100 text-xs">{t('description')}</div>
          <div className="min-h-[6rem] rounded mx-5 gap-x-8 gap-y-4 grid grid-cols-4 py-5 px-5 justify-center">
            {shuffledWords.map(word => (
              <Button
                clickableProps={{
                  className: isActive(word) ? 'bg-gray-100 text-asphalt border-none hover:bg-gray-100' : '',
                }}
                key={word}
                label={word}
                onClick={() => handlePress(word)}
                variant="outlined"
                flat
              />
            ))}
          </div>
          <Banner type="info" message={t('warning')} className="mx-10" />
        </div>

        <Button
          className="w-48"
          label={t('nextButtonLabel')}
          flat
          onClick={() => validateAndNext()}
          disabled={isDisabled()}
        />
      </div>
    </CreateWalletModalLayout>
  )
}
