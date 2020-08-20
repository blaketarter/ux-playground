import { makeStyles } from "@material-ui/core"
import React from "react"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { DelayedLoader } from "../DelayedLoader"
import { ListCardUser } from "../ListCardUser"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
  },
  spinnerWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}))

export default function RouteSpinner() {
  const classes = useStyles()
  const { data: users, error, isFetching } = useQueryUsers()

  return (
    <div className={classes.root}>
      {!error && !isFetching ? (
        <ListCardUser users={users ?? []} />
      ) : (
        <div className={classes.spinnerWrapper}>
          <DelayedLoader />
        </div>
      )}
    </div>
  )
}
