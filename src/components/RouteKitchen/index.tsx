import { Typography, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { ButtonLoader } from "../ButtonLoader"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
  },
  label: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}))

export default function RouteKitchen() {
  const classes = useStyles()
  const [buttonLoading, setButtonLoading] = useState(false)

  return (
    <div className={classes.root}>
      <label className={classes.label}>
        <Typography variant="subtitle2">Button with Loader</Typography>
        <ButtonLoader
          variant="contained"
          onClick={() => {
            setButtonLoading(true)
            setTimeout(() => setButtonLoading(false), 5000)
          }}
          loading={buttonLoading}
        >
          Click Me
        </ButtonLoader>
      </label>
    </div>
  )
}
