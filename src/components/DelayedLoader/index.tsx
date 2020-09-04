import { CircularProgress } from "@material-ui/core"
import React, { ComponentProps, useEffect, useRef, useState } from "react"

interface Props {
  children?: React.ReactNode
  delay?: number
  progressProps?: ComponentProps<typeof CircularProgress>
}

export function DelayedLoader({
  children,
  progressProps = {},
  delay = 500,
}: Props) {
  const [showLoader, setShowLoader] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      setShowLoader(true)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [delay])
  return showLoader ? (
    children ? (
      <>{children}</>
    ) : (
      <CircularProgress {...progressProps} />
    )
  ) : null
}
