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
  count: number,
  theme: string,
}

function NFT({ imageHref, url = '' }: { imageHref: string, url: string }) {
  const [isLoading, setIsLoading] = useState(true)

  const openLink = () => electron.shell.openExternal(url)

  function onLoad() {
    setIsLoading(false)
  }

  return (
    <>
      <div
        className={styles.placeholderContainer}
        style={{ display: isLoading ? 'block' : 'none' }}
        onClick={openLink}
      >
        <CanvasIcon />
      </div>

      {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
      <img
        src={imageHref}
        className={styles.newsImage}
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={onLoad}
        onClick={openLink}
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
  count,
  theme,
}: Props) {
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
                    contract,
                  }) => (
                    <div className={styles.newsItem} key={tokenId}>
                      <NFT
                        imageHref={image}
                        url={`https://ghostmarket.io/asset/n3/${contract}/${tokenId}/`}
                      />
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

                {count !== results.length && (
                  <div className={styles.loadMoreButton}>
                    <Button
                      onClick={() =>
                        fetchAddtionalNFTData(address, page + 1, results)
                      }
                      primary
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader className={styles.buttonLoadingIndicator} />
                      ) : (
                        'Load more'
                      )}
                    </Button>
                  </div>
                )}
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
