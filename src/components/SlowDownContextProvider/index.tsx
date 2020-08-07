import React, { useState } from "react"
import { SlowDownContext } from "../../utils/useSlowDown"

interface Props {
  children?: React.ReactNode
}

export function SlowDownContextProvider({ children }: Props) {
  const [slowDown, setSlowDown] = useState(false)
  return (
    <SlowDownContext.Provider value={{ slowDown, setSlowDown }}>
      {children}
    </SlowDownContext.Provider>
  )
}
