/* eslint-disable no-nested-ternary */
// @flow
import React, { useState } from 'react'
import { promises as fs } from 'fs'
import { ipcRenderer } from 'electron'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import { ROUTES } from '../../core/constants'
import styles from './Steps.scss'
import CloseButton from '../../components/CloseButton'
import BackButton from '../../components/BackButton'
import { Stepper } from '../../components/Stepper'
import MigrateWalletsNeon3Step1 from './Step1'
import MigrateWalletsNeon3Step2 from './Step2'
import MigrateWalletsNeon3Step3 from './Step3'

type Props = {
  accounts: Object,
  n3Accounts: Object,
  theme: string,
  intl: Object,
}

const MigrateWalletsNeon3Steps = ({
  accounts,
  n3Accounts,
  theme,
  intl,
}: Props) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPath, setSelectedPath] = useState('')

  const handleNextStep2 = async () => {
    if (!selectedPath) return

    await fs.writeFile(
      `${selectedPath}/NEON2-wallets-backup-${Date.now()}.json`,
      JSON.stringify([...accounts, ...n3Accounts]),
    )

    setCurrentStep(3)
  }

  const handleBrowse = async () => {
    const { canceled, filePaths } = await ipcRenderer.invoke(
      'dialog',
      'showOpenDialog',
      {
        properties: ['openDirectory'],
      },
    )

    if (canceled || !filePaths) return

    setSelectedPath(filePaths[0])
  }

  return (
    <FullHeightPanel
      renderInstructions={false}
      renderCloseButton={() => <CloseButton routeTo={ROUTES.HOME} />}
      renderBackButton={
        currentStep === 2
          ? () => (
              <BackButton onClick={() => setCurrentStep(prev => prev - 1)} />
            )
          : undefined
      }
      scrollableContentClassName={styles.scrollableContent}
      childrenContainerClassName={styles.childrenContainer}
      shouldRenderHeader={false}
    >
      <h1 className={styles.title}>Migrating your NEON 2 wallet</h1>

      <Stepper
        steps={[
          intl.messages.migrateWalletsNeon3Steps1,
          intl.messages.migrateWalletsNeon3Steps2,
          intl.messages.migrateWalletsNeon3Steps3,
        ]}
        currentStep={currentStep}
        className={styles.stepper}
      />

      {currentStep === 1 ? (
        <MigrateWalletsNeon3Step1 onNext={() => setCurrentStep(2)} />
      ) : currentStep === 2 ? (
        <MigrateWalletsNeon3Step2
          path={selectedPath}
          onNext={handleNextStep2}
          onSelectPath={setSelectedPath}
          onBrowse={handleBrowse}
        />
      ) : (
        <MigrateWalletsNeon3Step3 theme={theme} />
      )}
    </FullHeightPanel>
  )
}

export default MigrateWalletsNeon3Steps
