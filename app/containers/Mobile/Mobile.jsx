// @flow
import React from 'react'

import Panel from '../../components/Panel'
import InfoIcon from '../../assets/icons/info.svg'
import styles from './Mobile.scss'
import DialogueBox from '../../components/DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'
import AppStore from '../../assets/icons/app_store.svg'
import GooglePlay from '../../assets/icons/google_play.svg'
import ExportHero from '../../assets/icons/export_hero.png'
import ExportHeroLight from '../../assets/icons/export_hero_light.png'
import EncryptedIcon from '../../assets/icons/export_encrypted.svg'
import WatchIcon from '../../assets/icons/export_watch.svg'
import Button from '../../components/Button'
import Export from '../../assets/icons/external.svg'

import EncryptedIconLight from '../../assets/icons/export_encrypted_light.svg'
import WatchIconLight from '../../assets/icons/export_watch_light.svg'

type Props = {
  theme: string,
}

type State = {
  walletName: ?string,
}

export default class Receive extends React.Component<Props, State> {
  render() {
    return (
      <Panel
        renderHeader={() => <div> Export your wallet for mobile app </div>}
        contentClassName={styles.receivePanelContent}
      >
        <div className={styles.receiveExplanation}>
          <div className={styles.header}>
            <InfoIcon className={styles.icon} />
            <div className={styles.title}>
              Choose which version of your wallet you wish to export
            </div>
          </div>
          <div className={styles.message}>
            Sed ut ipsi auctori huius disciplinae placet: constituam, quid et
            aperta iudicari ea. Ut placet, inquam tum dicere exorsus est et
            rationibus confirmare, tantum satis esse.
            <br />
            <br />
            Alii autem, quibus ego cum teneam sententiam, quid et aperta
            iudicari etenim quoniam. Sed ut aliquid ex ea voluptate velit esse,
            quid bonum esse ratione neque.
          </div>

          <DialogueBox
            className={styles.mobileDialogue}
            icon={<WarningIcon />}
            renderText={() => (
              <div>
                Please make sure you keep your export codes safe and only export
                from a secure device{' '}
              </div>
            )}
          />

          <div className={styles.versionSelect}>
            Select which version of the NeonWallet app to download below.
            <div className={styles.versions}>
              <AppStore />
              <GooglePlay />
            </div>
          </div>
        </div>
        <div className={styles.exportContents}>
          <img
            src={this.props.theme === 'Dark' ? ExportHero : ExportHeroLight}
            alt="hero"
          />
          <span className={styles.exportInstructions}>
            {' '}
            please select from the following export options
          </span>

          <div className={styles.exportOptions}>
            <div className={styles.exportOptionCard}>
              {this.props.theme === 'Dark' ? (
                <EncryptedIcon />
              ) : (
                <EncryptedIconLight />
              )}
              <p>ENCRYPTED KEY</p>
              <Button primary renderIcon={() => <Export />}>
                Generate code
              </Button>
            </div>

            <div className={styles.exportOptionCard}>
              {this.props.theme === 'Dark' ? <WatchIcon /> : <WatchIconLight />}
              <p> WATCH WALLET</p>
              <Button primary renderIcon={() => <Export />}>
                Generate code
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}
