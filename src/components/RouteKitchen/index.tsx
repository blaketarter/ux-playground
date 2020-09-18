import { Typography, makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { ButtonHoldToConfirm } from "../ButtonHoldToConfirm"
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
    marginBottom: theme.spacing(2),
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}))

export default function RouteKitchen() {
  const classes = useStyles()
  const [buttonLoading1, setButtonLoading1] = useState(false)
  const [buttonLoading2, setButtonLoading2] = useState(false)
  const [buttonLoading2Success, setButtonLoading2Success] = useState(false)
  const [buttonLoading3, setButtonLoading3] = useState(false)
  const [buttonLoading3Error, setButtonLoading3Error] = useState(false)
  const [
    isButtonHoldToConfirmConfirmed,
    setIsButtonHoldToConfirmConfirmed,
  ] = useState(false)

  return (
    <div className={classes.root}>
      <label className={classes.label}>
        <Typography variant="subtitle2">Button with Loader</Typography>
        <ButtonLoader
          variant="contained"
          onClick={() => {
            setButtonLoading1(true)
            setTimeout(() => setButtonLoading1(false), 5000)
          }}
          loading={buttonLoading1}
        >
          Click Me
        </ButtonLoader>
      </label>
      <label className={classes.label}>
        <Typography variant="subtitle2">
          Button with Loader then Success
        </Typography>
        <ButtonLoader
          variant="contained"
          onClick={() => {
            setButtonLoading2(true)
            setTimeout(() => {
              setButtonLoading2(false)
              setButtonLoading2Success(true)
            }, 5000)
          }}
          loading={buttonLoading2}
          success={buttonLoading2Success}
        >
          Click Me
        </ButtonLoader>
      </label>
      <label className={classes.label}>
        <Typography variant="subtitle2">
          Button with Loader then error
        </Typography>
        <ButtonLoader
          variant="contained"
          onClick={() => {
            setButtonLoading3(true)
            setTimeout(() => {
              setButtonLoading3(false)
              setButtonLoading3Error(true)
            }, 5000)
          }}
          loading={buttonLoading3}
          error={buttonLoading3Error}
        >
          Click Me
        </ButtonLoader>
      </label>
      <label className={classes.label}>
        <Typography variant="subtitle2">Hold to confirm</Typography>
        <div className={classes.inline}>
          <ButtonHoldToConfirm
            variant="contained"
            confirmMS={1000}
            resetAfterConfirm={false}
            confirmAfterMouseUp={false}
            onConfirm={() => setIsButtonHoldToConfirmConfirmed(true)}
            onMouseDown={() => {
              if (isButtonHoldToConfirmConfirmed) {
                setIsButtonHoldToConfirmConfirmed(false)
              }
            }}
          >
            Send Email
          </ButtonHoldToConfirm>
          {isButtonHoldToConfirmConfirmed ? (
            <Typography
              color="textSecondary"
              variant="subtitle2"
              style={{ marginLeft: 10 }}
            >
              Confirmed
            </Typography>
          ) : null}
        </div>
      </label>
    </div>
  )
}
