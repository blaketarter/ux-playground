import { CircularProgress } from "@material-ui/core"
import React, { useEffect, useRef, useState } from "react"

interface Props {
  children?: React.ReactNode
  delay?: number
}

export function DelayedLoader({ children, delay = 500 }: Props) {
  const [showSpinner, setShowSpinner] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      setShowSpinner(true)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [delay])
  return showSpinner ? children ? <>{children}</> : <CircularProgress /> : null
}
