import { Button } from "@material-ui/core"
import React, { ComponentProps } from "react"
import { DelayedLoader } from "../DelayedLoader"

type Props = ComponentProps<typeof Button> & {
  loading?: boolean
}

export function ButtonLoader({ children, loading, ...props }: Props) {
  return (
    <Button
      disabled={loading}
      endIcon={
        loading ? (
          <DelayedLoader progressProps={{ size: 20, color: "inherit" }} />
        ) : null
      }
      {...props}
    >
      {children}
    </Button>
  )
}
