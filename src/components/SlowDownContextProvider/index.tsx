import React, { useCallback, useState } from "react"
import {
  SlowDownContext,
  defaultSlowDownContextState,
} from "../../utils/useSlowDown"

interface Props {
  children?: React.ReactNode
}

export function SlowDownContextProvider({ children }: Props) {
  const [slowRequest, setSlowRequest] = useState(
    defaultSlowDownContextState.slowRequest,
  )
  const [slowRequestMinimum, setSlowRequestMinimum] = useState(
    defaultSlowDownContextState.slowRequestMinimum,
  )

  const slowFetch = useCallback<typeof fetch>(
    async (...params) => {
      const start = new Date().getTime()

      const result = await fetch(...params)

      const end = new Date().getTime()
      const diff = end - start

      if (slowRequest && diff < slowRequestMinimum) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(result), slowRequestMinimum - diff),
        )
      } else {
        return result
      }
    },
    [slowRequest, slowRequestMinimum],
  )

  return (
    <SlowDownContext.Provider
      value={{
        slowRequest,
        setSlowRequest,
        slowRequestMinimum,
        setSlowRequestMinimum,
        slowFetch,
      }}
    >
      {children}
    </SlowDownContext.Provider>
  )
}
