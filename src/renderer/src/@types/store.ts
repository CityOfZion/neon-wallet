import { RootStore } from '@renderer/store/RootStore'

export type RootState = ReturnType<typeof RootStore.reducers>
