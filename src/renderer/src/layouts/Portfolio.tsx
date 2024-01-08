import { MainLayout, TMainLayoutProps } from './Main'

export const PortfolioLayout = ({ children, ...props }: TMainLayoutProps): JSX.Element => {
  return (
    <MainLayout {...props}>
      {children}
      <div className="flex-grow flex flex-col gap-y-5">
        <div className="w-full flex bg-gray-800 rounded flex-grow drop-shadow-lg animate-pulse"></div>
        <div className="w-full flex bg-gray-800 rounded flex-grow drop-shadow-lg animate-pulse"></div>
      </div>
    </MainLayout>
  )
}
