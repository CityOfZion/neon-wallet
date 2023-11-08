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

import NeoNS from '../../../assets/images/release-assets/neons.svg'
import MigrationLight from '../../../assets/images/release-assets/migration-light.svg'
import MigrationDark from '../../../assets/images/release-assets/migration-dark.svg'
import Ledger from '../../../assets/images/release-assets/ledger.svg'
import LedgerDark from '../../../assets/images/release-assets/ledger-dark.svg'
import release210Dark from '../../../assets/images/release-assets/2.10.0-dark.png'
import release210Light from '../../../assets/images/release-assets/2.10.0-light.png'

const electron = require('electron')

type Props = {
  hideModal: Function,
  theme: string,
}

export const ReleaseNotes = ({ theme }: { theme: string }) => (
  <div className={styles.releaseNotesContents}>
    <div className={styles.release}>
      <div className={styles.releaseContent}>
        <small className={styles.date}>Oct 11th 2023 </small>
        <h3>Release v2.21.3</h3>

        <p>
          In this update you will find the following minor improvements:
          <br />
          <br />
          <li>Several hot fixes for webp vulnerabilities</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.21.3',
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
        <small className={styles.date}>Sep 9th 2023 </small>
        <h3>Release v2.20.6</h3>

        <p>
          In this update you will find the following minor improvements:
          <br />
          <br />
          <li>Fixes legacy ledger transfers</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.20.6',
            )
          }
        />
      </div>
      <div className={styles.marketingImage}>
        {theme === 'Light' ? <Ledger /> : <LedgerDark />}
      </div>
    </div>

    <div className={styles.release}>
      <div className={styles.releaseContent}>
        <small className={styles.date}>Aug 8th 2023 </small>
        <h3>Release v2.19.2</h3>

        <p>
          In this update you will find the following minor improvements:
          <br />
          <br />
          <li>Improves contacts interface</li>
          <li>Improves WalletConnect operability</li>
          <li>Various minor bug fixes</li>
          <li>Under the hood dependency updates</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.19.2',
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
        <small className={styles.date}>Jul 13th 2023 </small>
        <h3>Release v2.18.0</h3>

        <p>
          In this update you will find the following minor improvements:
          <br />
          <br />
          <li>NeoNS integration</li>
          <li>WalletConnect deep linking to operate from a closed app state</li>
          <li>Various minor bug fixes</li>
          <li>Under the hood dependency updates</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.18.0',
            )
          }
        />
      </div>
      <div className={styles.marketingImage}>
        {theme === 'Light' ? <NeoNS /> : <NeoNS />}
      </div>
    </div>

    <div className={styles.release}>
      <div className={styles.releaseContent}>
        <small className={styles.date}>Mar 30th 2023 </small>
        <h3>Release v2.17.1</h3>

        <p>
          In this update you will find the following minor improvements:
          <br />
          <br />
          <li>Adds voter status to network configuration tooltip</li>
          <li>Adds custom network support</li>
          <li>Various minor bug fixes</li>
          <li>Under the hood dependency updates</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.17.1',
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
        <small className={styles.date}>Jan 18th 2023 </small>
        <h3>Release v2.16.29</h3>

        <p>
          In this update you will find the following minor improvements:
          <br />
          <br />
          <li>Adds support for Apple Silicon</li>
          <li>Fix for over the air updates on Windows</li>
          <li>Wallet Connect UI/UX enhancements </li>
          <li>Upgrade to v2 of the Ghost Market API</li>
          <li>Various minor bug fixes</li>
          <li>Under the hood dependency updates</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.16.29',
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
        <small className={styles.date}>Oct 8th 2021 </small>
        <h3>Release v2.10.0</h3>

        <p>
          In this release you will find the following updates:
          <br />
          <br />
          {/* eslint-disable-next-line */}
          <li>Implements wallet connect support</li>
          <li>Major dependency updates</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.10.0',
            )
          }
        />
      </div>
      <div className={styles.marketingImage}>
        {theme === 'Light' ? (
          <img src={release210Light} />
        ) : (
          <img src={release210Dark} />
        )}
      </div>
    </div>

    <div className={styles.release}>
      <div className={styles.releaseContent}>
        <small className={styles.date}>Sep 13th 2021 </small>
        <h3>Release v2.9.0</h3>

        <p>
          In this release you will find the following updates:
          <br />
          <br />
          {/* eslint-disable-next-line */}
          <li>Implements ledger support for Neo N3</li>
          <li>Allows ledger users to migrate from Neo Legacy to Neo N3</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.9.0',
            )
          }
        />
      </div>
      <div className={styles.marketingImage}>
        {theme === 'Light' ? <Ledger /> : <LedgerDark />}
      </div>
    </div>
    <div className={styles.release}>
      <div className={styles.releaseContent}>
        <small className={styles.date}>Aug 24th 2021 </small>
        <h3>Release v2.8.0</h3>

        <p>
          In this release you will find the following updates:
          <br />
          <br />
          {/* eslint-disable-next-line */}
          <li>Support for asset migration to N3</li>
          <li>Support for Neo Legacy TestNet</li>
          <br />
          View full details of this release on GitHub
          <br />
        </p>

        <Github
          onClick={() =>
            electron.shell.openExternal(
              'https://github.com/CityOfZion/neon-wallet/releases/tag/v2.8.0',
            )
          }
        />
      </div>
      <div className={styles.marketingImage}>
        {theme === 'Light' ? <MigrationLight /> : <MigrationDark />}
      </div>
    </div>
    <div className={styles.release}>
      <div className={styles.releaseContent}>
        <small className={styles.date}>Aug 5th 2021 </small>
        <h3>Release v2.7.4</h3>

        <p>
          In this release you will find the following updates:
          <br />
          <br />
          {/* eslint-disable-next-line */}
          <li>Support for Neo (N3) MainNet and TestNet 🎉</li>
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
          In this update you will find the following improvements and updated
          features:
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
)

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
    {' '}
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
      <ReleaseNotes theme={theme} hideModal={hideModal} />
    </FullHeightPanel>
  </BaseModal>
)

export default ReleaseNotesModal
