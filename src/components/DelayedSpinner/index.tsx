import { CircularProgress } from "@material-ui/core"
import React, { useEffect, useState } from "react"

export function DelayedSpinner() {
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(true)
    }, 500)
  }, [])
  return showSpinner ? <CircularProgress /> : null
}
