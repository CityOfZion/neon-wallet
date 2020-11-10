// @flow
import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './ReleaseNotesModal.scss'
import CloseButton from '../../CloseButton'
import Gift from '../../../assets/icons/gift.svg'

import release260Dark from '../../../assets/images/release-assets/2.6.0.dark.png'
import release260Light from '../../../assets/images/release-assets/2.6.0.light.png'

const electron = require('electron').remote

type Props = {
  hideModal: Function,
  theme: string,
}

const ReleaseNotesModal = ({ hideModal, theme }: Props) => (
  <BaseModal
    hideModal={hideModal}
    shouldRenderHeader={false}
    style={{
      content: {
        width: '730px',
        height: '100%',
      },
    }}
  >
    <FullHeightPanel
      containerClassName={styles.releaseNotesContainer}
      renderInstructions={false}
      renderHeaderIcon={() => <Gift />}
      headerText="Release notes"
      renderCloseButton={() => (
        <div className={styles.closeButton} onClick={() => hideModal()}>
          <CloseButton renderWithoutLink />
        </div>
      )}
    >
      <div className={styles.releaseNotesContents}>
        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small className={styles.date}>10th Nov 2020 </small>
            <h3>Welcome to the latest release of Neon wallet v.2.6.0</h3>

            <p>
              In this update you will find the following improvements and
              updated features:
              <br />
              <br />
              <li>Automatic updates for future releases</li>
              <li>Integrations with Neon Mobile</li>
              <li>Security and dependency updates</li>
              <li>Design enhancements</li>
              <li>Various minor bug fixes</li>
              <br />
            </p>

            <Button
              onClick={() =>
                electron.shell.openExternal(
                  'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.6.0',
                )
              }
            >
              Learn more
            </Button>
          </div>
          <div className={styles.marketingImage}>
            <img
              src={theme === 'Light' ? release260Light : release260Dark}
              alt="marketing-content"
            />
          </div>
        </div>
      </div>
    </FullHeightPanel>
  </BaseModal>
)

export default ReleaseNotesModal
