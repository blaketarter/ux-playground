import { Button, makeStyles } from "@material-ui/core"
import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

type Props = ComponentProps<typeof Button> & {
  onConfirm?: () => unknown
  confirmMS: number
  resetAfterConfirm?: boolean
  confirmAfterMouseUp?: boolean
}

const useStyles = makeStyles((theme) => ({
  button: {
    overflow: "hidden",
    position: "relative",
  },
  progress: {
    background: theme.palette.grey[500],
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "0%",
  },
  children: {
    position: "relative",
  },
}))

export function ButtonHoldToConfirm({
  children,
  confirmMS,
  onConfirm,
  resetAfterConfirm,
  confirmAfterMouseUp,
  ...props
}: Props) {
  const classes = useStyles()
  const progressRef = useRef<HTMLDivElement | null>(null)
  const animationId = useRef<number | null>(null)
  const timeHeldRef = useRef<number>(0)
  const [confirmed, setConfirmed] = useState(false)
  const [isHolding, setIsHolding] = useState(false)

  const stopProgress = useCallback((resetProgress?: boolean) => {
    if (animationId.current) {
      cancelAnimationFrame(animationId.current)
      animationId.current = null
    }

    if (progressRef.current) {
      progressRef.current.style.willChange = ""

      if (resetProgress) {
        progressRef.current.style.height = "0%"
      }
    }
  }, [])

  const animateProgressForward = useCallback(
    (startTimestamp: number, currentTimestamp: number) => {
      const timeElapsed = currentTimestamp - startTimestamp
      timeHeldRef.current = timeElapsed
      const percentage = Math.max(Math.min(timeElapsed / confirmMS, 1), 0)

      if (progressRef.current) {
        progressRef.current.style.height = `${percentage * 100}%`
      }

      if (percentage >= 1) {
        if (!confirmAfterMouseUp) {
          onConfirm?.()
        }

        stopProgress(!confirmAfterMouseUp && resetAfterConfirm)
        setConfirmed(true)
      } else {
        animationId.current = requestAnimationFrame((nextTimestamp) =>
          animateProgressForward(startTimestamp, nextTimestamp),
        )
      }
    },
    [
      confirmAfterMouseUp,
      confirmMS,
      onConfirm,
      resetAfterConfirm,
      stopProgress,
    ],
  )

  const animateProgressBackward = useCallback(
    (startTimestamp: number, timeHeld: number, currentTimestamp: number) => {
      const timeElapsed = timeHeld - (currentTimestamp - startTimestamp) * 2
      const percentage = Math.max(Math.min(timeElapsed / confirmMS, 1), 0)
      if (progressRef.current) {
        progressRef.current.style.height = `${percentage * 100}%`
      }

      if (percentage <= 0) {
        stopProgress(true)
      } else {
        animationId.current = requestAnimationFrame((nextTimestamp) =>
          animateProgressBackward(startTimestamp, timeHeld, nextTimestamp),
        )
      }
    },
    [confirmMS, stopProgress],
  )

  const onMouseUp = useCallback(() => {
    setIsHolding(false)
    document.removeEventListener("mouseup", onMouseUp)

    if (confirmed && confirmAfterMouseUp) {
      onConfirm?.()
      stopProgress(resetAfterConfirm)

      if (resetAfterConfirm) {
        setConfirmed(false)
      }
    } else if (!confirmed) {
      const startTimestamp = performance.now()
      const timeHeld = timeHeldRef.current

      stopProgress(false)

      if (progressRef.current) {
        progressRef.current.style.willChange = "height"
      }

      animationId.current = requestAnimationFrame((timestamp) =>
        animateProgressBackward(startTimestamp, timeHeld, timestamp),
      )
    }
  }, [
    animateProgressBackward,
    confirmAfterMouseUp,
    confirmed,
    onConfirm,
    resetAfterConfirm,
    stopProgress,
  ])

  const onMouseDown = useCallback(() => {
    setConfirmed(false)
    setIsHolding(true)
    const startTimestamp = performance.now()

    if (progressRef.current) {
      progressRef.current.style.willChange = "height"
    }

    document.addEventListener("mouseup", onMouseUp)

    animationId.current = requestAnimationFrame((timestamp) =>
      animateProgressForward(startTimestamp, timestamp),
    )
  }, [animateProgressForward, onMouseUp])

  useEffect(() => {
    if (isHolding) {
      document.addEventListener("mouseup", onMouseUp)
    }
    return () => {
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [isHolding, onMouseUp])

  useEffect(() => {
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [])

  return (
    <Button
      className={classes.button}
      disableRipple
      onMouseDown={onMouseDown}
      {...props}
    >
      <div ref={progressRef} className={classes.progress} />
      <div className={classes.children}>{children}</div>
    </Button>
  )
}
