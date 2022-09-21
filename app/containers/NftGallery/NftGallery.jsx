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
import { MODAL_TYPES } from '../../core/constants'

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
  mediaType,
  isWatchOnly,
  showModal,
  contract,
  tokenId,
}: {
  imageHref: string,
  url: string,
  mediaType: string,
  isWatchOnly: boolean,
  showModal: (type: string, props: any) => any,
  contract: string,
  tokenId: string,
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [displaySendButton, setDisplaySendButton] = useState(false)

  const openLink = () => electron.shell.openExternal(url)

  function onLoad() {
    setIsLoading(false)
  }

  function showSendButton(display) {
    if (!isWatchOnly) {
      setDisplaySendButton(display)
    }
  }

  return (
    <>
      {displaySendButton && (
        <div
          className={styles.transferButton}
          onMouseEnter={() => showSendButton(true)}
        >
          <Button
            primary
            onClick={() =>
              showModal(TRANSFER_NFT, {
                imageHref,
                url,
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
      <div
        className={styles.placeholderContainer}
        style={{ display: isLoading ? 'block' : 'none' }}
        onClick={openLink}
        onMouseEnter={() => showSendButton(true)}
        onMouseLeave={() => showSendButton(false)}
      >
        <CanvasIcon />
      </div>

      <>
        {mediaType.includes('video') ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            autoPlay
            name="media"
            onLoadedMetadata={onLoad}
            loop
            onMouseEnter={() => showSendButton(true)}
            onMouseLeave={() => showSendButton(false)}
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
            onMouseEnter={() => showSendButton(true)}
            onMouseLeave={() => showSendButton(false)}
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
  console.log({ count })
  console.log({ results })
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
                {results.map(data => {
                  const {
                    // eslint-disable-next-line camelcase
                    metadata: { image, name, description, media_type },
                    tokenId,
                    collection,
                    contract,
                  } = data

                  return (
                    <div className={styles.newsItem} key={tokenId}>
                      <NFT
                        imageHref={image}
                        // eslint-disable-next-line camelcase
                        mediaType={media_type}
                        url={`https://ghostmarket.io/asset/n3/${contract}/${tokenId}/`}
                        isWatchOnly={isWatchOnly}
                        showModal={showModal}
                        contract={contract}
                        tokenId={tokenId}
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
