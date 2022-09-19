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

function NFT({ image }) {
  const [isLoading, setIsLoading] = useState(true)

  function onLoad() {
    // delay for demo only
    // setTimeout(() => setIsLoading(false), 1000)
    setIsLoading(false)
    // setIsLoading(false)
  }

  return (
    <>
      {/* <img
        // alt="ad-img"
        // width={300}
        src="https://via.placeholder.com/300x200/FF0000"
        style={{ display: isLoading ? 'block' : 'none' }}
      /> */}
      <div
        className={styles.placeholderContainer}
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <CanvasIcon />
      </div>
      {/* <img
        alt="ad-img"
        width={300}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1hIjBaj0A0XNB_xAozRAcFs6Gr0DQhWTGiQ&usqp=CAU"
        style={{ display: isLoading ? "none" : "block" }}
        onLoad={onLoad}
      /> */}

      <img
        src={image}
        // alt={name}
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
        // onScroll={handleScroll}
        contentClassName={styles.newsPanelContent}
        className={styles.newsPanel}
      >
        {loading && !results?.length ? (
          <Loader />
        ) : (
          <div className={styles.newsItemsContainer}>
            {results.map(({ metadata: { image, name }, token_id }) => (
              <div
                onClick={openLink}
                className={styles.newsItem}
                key={token_id}
              >
                <NFT image={image} />
                <div className={styles.content}>
                  <small>{name}</small>
                  <p> {name}</p>
                </div>
              </div>
            ))}
            <div className={styles.loadMoreButton}>
              <Button
                onClick={() =>
                  fetchAddtionalNFTData(address, page + 1, results)
                }
                primary
                disabled={loading}
              >
                {/* {loading ? <Loader /> : 'Load more'} */}
                Load more
                {/* <Loader /> */}
              </Button>
            </div>
          </div>
        )}
      </Panel>
    </div>
  )
}
