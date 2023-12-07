import InfiniteScroll from 'react-infinite-scroll-component'

import { MainLayout, TMainLayoutProps } from './Main'

export const PortfolioLayout = ({ children, ...props }: TMainLayoutProps): JSX.Element => {
  return (
    <MainLayout {...props}>
      {children}
      <div className="flex-grow flex flex-col gap-y-5">
        <div className="w-full flex bg-gray-800 rounded flex-grow drop-shadow-lg animate-pulse"></div>
        <div className="w-full flex bg-gray-800 rounded flex-grow drop-shadow-lg animate-pulse">
          <InfiniteScroll
            dataLength={items.length} //This is important field to render the next data
            next={fetchData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={this.refresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
          >
            {items}
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
  )
}
