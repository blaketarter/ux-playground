import { Button } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline"
import React, { ComponentProps } from "react"
import { DelayedLoader } from "../DelayedLoader"

type Props = ComponentProps<typeof Button> & {
  loading?: boolean
  success?: boolean
  error?: boolean
}

export function ButtonLoader({
  children,
  loading,
  success,
  error,
  ...props
}: Props) {
  return (
    <Button
      disabled={loading}
      endIcon={
        loading ? (
          <DelayedLoader
            delay={0}
            progressProps={{ size: 20, color: "inherit" }}
          />
        ) : error ? (
          <ErrorOutlineIcon />
        ) : success ? (
          <CheckIcon />
        ) : null
      }
      {...props}
    >
      {children}
    </Button>
  )
}
