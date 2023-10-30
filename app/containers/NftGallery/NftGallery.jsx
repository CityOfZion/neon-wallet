// @flow
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Panel from '../../components/Panel'
import HeaderBar from '../../components/HeaderBar'
import styles from './NftGallery.scss'
import Loader from '../../components/Loader'
import Button from '../../components/Button'
import CanvasIcon from '../../assets/navigation/canvas.svg'
import LogoWithStrikethrough from '../../components/LogoWithStrikethrough'
import { MODAL_TYPES } from '../../core/constants'
import SendIcon from '../../assets/icons/send.svg'
import RefreshButton from '../Buttons/RefreshButton'

const { TRANSFER_NFT } = MODAL_TYPES

const electron = require('electron')

type Props = {
  fetchAddtionalNFTData: (
    address: string,
    results: Object,
    cursor?: string,
  ) => [],
  results: Object,
  address: string,
  loading: boolean,
  networkId: string,
  net: string,
  next?: string,
  // count: number,
  isWatchOnly: boolean,
  showModal: (type: string, props: any) => any,
  hasMore: boolean,
}

export function NFT({
  mediaUri,
  url = '',
  mediaType = '',
}: {
  mediaUri: string,
  url: string,
  mediaType: string,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [parsedMediaType, setParsedMediaType] = useState(mediaType)

  const openLink = () => electron.shell.openExternal(url)

  function onLoad() {
    setIsLoading(false)
  }

  useEffect(
    () => {
      async function determineMediaType() {
        try {
          const mediaUrl = mediaUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
          const results = await axios.head(mediaUrl)
          setParsedMediaType(results?.headers?.['content-type'] ?? '')
        } catch (e) {
          console.warn(
            'Was unable to determine media type for NFT! Displaying default image...',
          )
        }
      }

      if (!mediaType) {
        determineMediaType()
      }
    },
    [mediaType, mediaUri],
  )

  return (
    <>
      <div
        className={styles.placeholderContainer}
        style={{ display: isLoading ? 'block' : 'none' }}
        onClick={openLink}
      >
        <CanvasIcon />
      </div>

      <>
        {parsedMediaType.includes('video') ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            autoPlay
            name="media"
            onLoadedMetadata={onLoad}
            loop
            onClick={openLink}
            style={{ display: isLoading ? 'none' : 'block' }}
          >
            <source
              src={mediaUri.replace('ipfs://', 'https://ipfs.io/ipfs/')}
              type="video/mp4"
            />
          </video>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <img
            src={mediaUri.replace('ipfs://', 'https://ipfs.io/ipfs/')}
            className={styles.newsImage}
            style={{ display: isLoading ? 'none' : 'block' }}
            onLoad={onLoad}
            onClick={openLink}
          />
        )}
      </>
    </>
  )
}

export default function NFTGallery({
  networkId,
  net,
  address,
  results,
  loading,
  next,
  fetchAddtionalNFTData,
  hasMore,
  isWatchOnly,
  showModal,
}: Props) {
  function decodeTokenId(tokenId) {
    return atob(tokenId)
  }

  return (
    <div className={styles.nftGalleryContainer}>
      <HeaderBar
        networkId={networkId}
        net={net}
        label="NFT Gallery"
        renderRightContent={() => (
          <div>
            <RefreshButton />
          </div>
        )}
      />
      <Panel
        contentClassName={styles.nftGalleryPanelContent}
        className={styles.newsPanel}
      >
        {loading && !results?.length ? (
          <Loader />
        ) : (
          <div className={styles.nftItemsContainer}>
            {results.length ? (
              <>
                {results.map(data => {
                  const {
                    metadata: { mediaUri, name, description, mediaType },
                    tokenId,
                    collection,
                    contract,
                  } = data

                  return (
                    <div className={styles.nftWrapper} key={tokenId}>
                      <NFT
                        mediaUri={mediaUri}
                        mediaType={mediaType}
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
                        <div className={styles.tokenId}>
                          <div className={styles.collectionName}>TOKEN ID:</div>{' '}
                          <div className={styles.tokenIdContainer}>
                            {decodeTokenId(tokenId)}
                          </div>
                        </div>
                        {!isWatchOnly && (
                          <div className={styles.transferButton}>
                            <Button
                              primary
                              renderIcon={() => <SendIcon />}
                              onClick={() =>
                                showModal(TRANSFER_NFT, {
                                  mediaUri,
                                  url: `https://ghostmarket.io/asset/n3/${contract}/${tokenId}/`,
                                  mediaType,
                                  isWatchOnly: true,
                                  showModal,
                                  contract,
                                  tokenId,
                                })
                              }
                            >
                              Send
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {hasMore && (
                  <div className={styles.loadMoreButton}>
                    <Button
                      onClick={() =>
                        fetchAddtionalNFTData(address, results, next)
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
