import { createBrowserRouter } from 'react-router-dom'
import { PortfolioPage } from '@renderer/pages/Portfolio'

export const router = createBrowserRouter([{ path: '/', element: <PortfolioPage /> }])
