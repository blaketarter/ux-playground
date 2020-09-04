import { Slide } from "@material-ui/core"
import React, { ComponentProps, useEffect, useRef, useState } from "react"

type Props = ComponentProps<typeof Slide> & {
  delay?: number
}
export function DelayedSlide({ children, delay = 0, ...props }: Props) {
  const [showComp, setShowComp] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null
      setShowComp(true)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [delay])
  return showComp ? (
    children ? (
      <Slide {...props}>{children}</Slide>
    ) : null
  ) : null
}
