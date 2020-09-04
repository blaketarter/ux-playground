import { Fade } from "@material-ui/core"
import React, { ComponentProps, useEffect, useRef, useState } from "react"

type Props = ComponentProps<typeof Fade> & {
  delay?: number
}
export function DelayedFade({ children, delay = 0, ...props }: Props) {
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
  return showComp ? children ? <Fade {...props}>{children}</Fade> : null : null
}
