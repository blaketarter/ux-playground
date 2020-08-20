import { createContext, useContext } from "react"

interface SlowDownContextState {
  slowRequest: boolean
  slowRequestMinimum: number
  setSlowRequest: (slowRequest: boolean) => unknown
  setSlowRequestMinimum: (slowRequestMinimum: number) => unknown
  slowFetch: typeof fetch
}

export const defaultSlowDownContextState = {
  slowRequest: false,
  slowRequestMinimum: 1000,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSlowRequest: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSlowRequestMinimum: () => {},
  slowFetch: fetch,
}

export const SlowDownContext = createContext<SlowDownContextState>(
  defaultSlowDownContextState,
)

export const useSlowDown = () => {
  return useContext(SlowDownContext)
}
