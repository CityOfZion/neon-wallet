// @flow
export type ProgressState = 'INITIAL' | 'LOADING' | 'LOADED' | 'FAILED'

export const INITIAL: ProgressState = 'INITIAL'
export const LOADING: ProgressState = 'LOADING'
export const LOADED: ProgressState = 'LOADED'
export const FAILED: ProgressState = 'FAILED'
