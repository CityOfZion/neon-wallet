import { RouterProvider } from 'react-router-dom'

import { setupSentryWrapper } from './libs/sentryReact'
import { pagesRouter } from './routes/pagesRouter'

const AppReact = (): JSX.Element => {
  return <RouterProvider router={pagesRouter} />
}

export const App = setupSentryWrapper(AppReact)
