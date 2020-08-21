import React, { useCallback, useState } from "react"
import {
  SlowDownContext,
  defaultSlowDownContextState,
} from "../../utils/useSlowDown"

interface Props {
  children?: React.ReactNode
}

export function SlowDownContextProvider({ children }: Props) {
  const [slowRequest, setSlowRequest] = useState(() => {
    const storedSlowRequest = sessionStorage.getItem("slowRequest")

    return storedSlowRequest
      ? Boolean(storedSlowRequest)
      : defaultSlowDownContextState.slowRequest
  })
  const [slowRequestMinimum, setSlowRequestMinimum] = useState(() => {
    const storedSlowRequestMinimum = sessionStorage.getItem(
      "slowRequestMinimum",
    )

    return storedSlowRequestMinimum
      ? Number(storedSlowRequestMinimum)
      : defaultSlowDownContextState.slowRequestMinimum
  })

  const setSlowRequestStored = useCallback(
    (newSlowRequest: boolean) => {
      if (newSlowRequest) {
        sessionStorage.setItem("slowRequest", "" + newSlowRequest)
      } else {
        sessionStorage.removeItem("slowRequest")
      }
      return setSlowRequest(newSlowRequest)
    },
    [setSlowRequest],
  )
  const setSlowRequestMinimumStored = useCallback(
    (newSlowRequestMinimum: number) => {
      if (newSlowRequestMinimum) {
        sessionStorage.setItem("slowRequestMinimum", "" + newSlowRequestMinimum)
      } else {
        sessionStorage.removeItem("slowRequestMinimum")
      }
      return setSlowRequestMinimum(newSlowRequestMinimum)
    },
    [setSlowRequestMinimum],
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
        setSlowRequest: setSlowRequestStored,
        slowRequestMinimum,
        setSlowRequestMinimum: setSlowRequestMinimumStored,
        slowFetch,
      }}
    >
      {children}
    </SlowDownContext.Provider>
  )
}
