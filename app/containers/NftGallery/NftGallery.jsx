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
  fetchAddtionalNFTData: (address: string, page: number, results: Object) => [],
  results: Object,
  address: string,
  loading: boolean,
  networkId: string,
  net: string,
  page: number,
  count: number,
  isWatchOnly: boolean,
  showModal: (type: string, props: any) => any,
}

export function NFT({
  imageHref,
  url = '',
  mediaType = '',
}: {
  imageHref: string,
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
          const mediaUrl = imageHref.replace('ipfs://', 'https://ipfs.io/ipfs/')
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
    [mediaType],
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
          >
            <source
              src={imageHref.replace('ipfs://', 'https://ipfs.io/ipfs/')}
              type="video/mp4"
            />
          </video>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <img
            src={imageHref.replace('ipfs://', 'https://ipfs.io/ipfs/')}
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
  page,
  fetchAddtionalNFTData,
  count,
  isWatchOnly,
  showModal,
}: Props) {
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
                    // eslint-disable-next-line camelcase
                    metadata: { image, name, description, media_type },
                    tokenId,
                    collection,
                    contract,
                  } = data

                  return (
                    <div className={styles.nftWrapper} key={tokenId}>
                      <NFT
                        imageHref={image}
                        // eslint-disable-next-line camelcase
                        mediaType={media_type}
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
                          <p className={styles.collectionName}>TOKEN ID:</p>{' '}
                          <p>{tokenId}</p>
                        </div>
                        {!isWatchOnly && (
                          <div className={styles.transferButton}>
                            <Button
                              primary
                              renderIcon={() => <SendIcon />}
                              onClick={() =>
                                showModal(TRANSFER_NFT, {
                                  imageHref: image,
                                  url: `https://ghostmarket.io/asset/n3/${contract}/${tokenId}/`,
                                  mediaType: media_type,
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
