// @flow
import { compose, withProps } from 'recompose'
import { withProgress, progressValues, type Actions } from 'spunky'

const { LOADING } = progressValues

const LOADING_PROP: string = 'loading'
const PROGRESS_PROP: string = '__progress__'

type Options = {
  propName?: string,
  [key: string]: mixed
}

export default function withLoadingProp(
  actions: Actions,
  { propName = LOADING_PROP, ...options }: Options = {}
) {
  return compose(
    withProgress(actions, { propName: PROGRESS_PROP, ...options }),
    withProps(props => ({
      [LOADING_PROP]: props[PROGRESS_PROP] === LOADING
    }))
  )
}
