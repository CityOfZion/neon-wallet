// @flow
import { createActions } from 'spunky'

export const ID = 'internet-connectivity-prompt'

export const internetConnectionPromptPresented = createActions(
  ID,
  (bool = false) => (): {
    internetConnectionPromptPresented: boolean,
  } => ({
    internetConnectionPromptPresented: bool,
  }),
)
