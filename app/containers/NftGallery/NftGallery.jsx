// @flow
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import Panel from '../../components/Panel'
import HeaderBar from '../../components/HeaderBar'
import styles from './NftGallery.scss'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import CanvasIcon from '../../assets/navigation/canvas.svg'
import LogoWithStrikethrough from '../../components/LogoWithStrikethrough'

const electron = require('electron')

type Props = {
  fetchAddtionalNFTData: (address: string, page: number, results: Object) => [],
  results: Object,
  address: string,
  loading: boolean,
  networkId: string,
  net: string,
  page: number,
}

function NFT({ image }: { image: string }) {
  const [isLoading, setIsLoading] = useState(true)

  function onLoad() {
    setIsLoading(false)
  }

  return (
    <>
      <div
        className={styles.placeholderContainer}
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <CanvasIcon />
      </div>

      <img
        src={image}
        className={styles.newsImage}
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={onLoad}
      />
    </>
  )
}

export default function NFTGallery({
  networkId,
  net,
  address,
  results,
  loading,
  page,
  fetchAddtionalNFTData,
}: Props) {
  const openLink = () => electron.shell.openExternal('')
  return (
    <div className={styles.newsContainer}>
      <HeaderBar networkId={networkId} net={net} label="NFT Gallery" />
      <Panel
        contentClassName={styles.newsPanelContent}
        className={styles.newsPanel}
      >
        {loading && !results?.length ? (
          <Loader />
        ) : (
          <div className={styles.newsItemsContainer}>
            {results.length ? (
              <>
                {results.map(
                  ({
                    metadata: { image, name, description },
                    tokenId,
                    collection,
                  }) => (
                    <div
                      onClick={openLink}
                      className={styles.newsItem}
                      key={tokenId}
                    >
                      <NFT image={image} />
                      <div className={styles.content}>
                        <p className={styles.collectionName}>
                          {collection.name}
                        </p>
                        <p> {name}</p>
                        {description && (
                          <>
                            <small>{description}</small>
                            <br />
                          </>
                        )}
                        <small>TOKEN ID:</small> <code>{tokenId}</code>
                      </div>
                    </div>
                  ),
                )}

                <div className={styles.loadMoreButton}>
                  <Button
                    onClick={() =>
                      fetchAddtionalNFTData(address, page + 1, results)
                    }
                    primary
                    disabled={loading}
                  >
                    Load more
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.empty}>
                <LogoWithStrikethrough />
              </div>
            )}
          </div>
        )}
      </Panel>
    </div>
  )
}
