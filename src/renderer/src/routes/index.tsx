import { createBrowserRouter } from 'react-router-dom'
import { WelcomePage } from '@renderer/pages/Welcome'

export const router = createBrowserRouter([{ path: '/', element: <WelcomePage /> }])
