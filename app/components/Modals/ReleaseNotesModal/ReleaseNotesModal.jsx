// @flow
import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import styles from './ReleaseNotesModal.scss'
import CloseButton from '../../CloseButton'
import Gift from '../../../assets/icons/gift.svg'
import release260Dark from '../../../assets/images/release-assets/2.6.0.dark.png'
import release260Light from '../../../assets/images/release-assets/2.6.0.light.png'
import Github from '../../../assets/images/release-assets/github.svg'
import PatchLight from '../../../assets/images/release-assets/patch-light.svg'
import PatchDark from '../../../assets/images/release-assets/patch-dark.svg'

import N3SupportLight from '../../../assets/images/release-assets/n3_support_light.svg'
import N3SupportDark from '../../../assets/images/release-assets/n3_support_dark.svg'

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
            <small className={styles.date}>Aug 5th 2021 </small>
            <h3>Release v2.7.4</h3>

            <p>
              In this update you will find the following updates:
              <br />
              <br />
              {/* eslint-disable-next-line */}
              <li>Support for N3 main and test nets 🎉🎉</li>
              <li>Under the hood dependency updates</li>
              <li>Performance enhancements</li>
              <br />
              View full details of this release on GitHub
              <br />
            </p>

            <Github
              onClick={() =>
                electron.shell.openExternal(
                  'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.7.4',
                )
              }
            />
          </div>
          <div className={styles.marketingImage}>
            {theme === 'Light' ? <N3SupportLight /> : <N3SupportDark />}
          </div>
        </div>

        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small className={styles.date}>Dec 1st 2020 </small>
            <h3>Patch v2.6.1</h3>

            <p>
              In this update you will find the following minor improvements:
              <br />
              <br />
              <li>Updates RPC node list</li>
              <li>Fixes edge case balance bugs</li>
              <li>Adds Dora and Neotube to explorers</li>
              <br />
              View full details of this release on GitHub
              <br />
            </p>

            <Github
              onClick={() =>
                electron.shell.openExternal(
                  'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.6.1',
                )
              }
            />
          </div>
        </div>

        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small className={styles.date}>Jan 18th 2021 </small>
            <h3>Patch v2.6.2</h3>

            <p>
              In this update you will find the following minor improvements:
              <br />
              <br />
              <li>Fixes bug related to SWTH contract</li>
              <li>
                Adds dutch translation{' '}
                <span aria-label="party" role="img">
                  🇳🇱🎉
                </span>{' '}
              </li>
              <li>Performance enhancements</li>
              <br />
              View full details of this release on GitHub
              <br />
            </p>

            <Github
              onClick={() =>
                electron.shell.openExternal(
                  'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.6.2',
                )
              }
            />
          </div>
          <div className={styles.marketingImage}>
            {theme === 'Light' ? <PatchLight /> : <PatchDark />}
          </div>
        </div>

        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small className={styles.date}>Dec 1st 2020 </small>
            <h3>Patch v2.6.1</h3>

            <p>
              In this update you will find the following minor improvements:
              <br />
              <br />
              <li>Updates RPC node list</li>
              <li>Fixes edge case balance bugs</li>
              <li>Adds Dora and Neotube to explorers</li>
              <br />
              View full details of this release on GitHub
              <br />
            </p>

            <Github
              onClick={() =>
                electron.shell.openExternal(
                  'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.6.1',
                )
              }
            />
          </div>
        </div>

        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small className={styles.date}>Nov 10th 2020 </small>
            <h3>Welcome to the latest release of Neon wallet v2.6.0</h3>

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
              View full details of this release on GitHub
              <br />
            </p>

            <Github
              onClick={() =>
                electron.shell.openExternal(
                  'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.6.0',
                )
              }
            />
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
