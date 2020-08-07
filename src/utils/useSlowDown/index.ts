import { createContext, useContext } from "react"

export const SlowDownContext = createContext<{
  slowDown: boolean
  setSlowDown: (slowDown: boolean) => unknown
}>({
  slowDown: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSlowDown: () => {},
})

export const useSlowDown = () => {
  return useContext(SlowDownContext)
}
