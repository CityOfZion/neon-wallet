// @flow
import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './ReleaseNotesModal.scss'
import CloseButton from '../../CloseButton'
import Gift from '../../../assets/icons/gift.svg'
import MobileMarketing from '../../../assets/images/mobile-marketing.png'

type Props = {
  hideModal: Function,
}

const ReleaseNotesModal = ({ hideModal }: Props) => (
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
      headerText="New Features"
      renderCloseButton={() => (
        <div className={styles.closeButton} onClick={() => hideModal()}>
          <CloseButton renderWithoutLink />
        </div>
      )}
    >
      <div className={styles.releaseNotesContents}>
        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small> v2.7.0</small>
            <small className={styles.date}>25th Sep 2020 </small>
            <h3>We have now released our mobile wallet for IOS and Android!</h3>

            <p>
              Filium morte multavit si sine causa, mox videro; interea hoc
              epicurus in gravissimo bello animadversionis metu degendae
              praesidia firmissima filium morte multavit si sine metu
              contineret, saluti prospexit civium, qua intellegebat contineri
              suam atque corrupti, quos tu tam crudelis. Sunt autem quibusdam et
              dolorem? sunt autem nusquam hoc tenebo, si mihi probabis ea, quae
              sine dubio praeclara sunt.
            </p>

            <Button>Learn more</Button>
          </div>
          <div className={styles.marketingImage}>
            <img src={MobileMarketing} alt="marketing-content" />
          </div>
        </div>
        <div className={styles.release}>
          <div className={styles.releaseContent}>
            <small> v2.7.0</small>
            <small className={styles.date}>25th Sep 2020 </small>
            <h3>We have now released our mobile wallet for IOS and Android!</h3>

            <p>
              Filium morte multavit si sine causa, mox videro; interea hoc
              epicurus in gravissimo bello animadversionis metu degendae
              praesidia firmissima filium morte multavit si sine metu
              contineret, saluti prospexit civium, qua intellegebat contineri
              suam atque corrupti, quos tu tam crudelis. Sunt autem quibusdam et
              dolorem? sunt autem nusquam hoc tenebo, si mihi probabis ea, quae
              sine dubio praeclara sunt.
            </p>

            <Button>Learn more</Button>
          </div>
          <div className={styles.marketingImage}>
            <img src={MobileMarketing} alt="marketing-content" />
          </div>
        </div>
      </div>
    </FullHeightPanel>
  </BaseModal>
)

export default ReleaseNotesModal
