import { makeStyles } from "@material-ui/core"
import React from "react"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { CardUser } from "../CardUser"
import { DelayedLoader } from "../DelayedLoader"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}))

export default function RouteSpinner() {
  const classes = useStyles()
  const { data: users, error, isFetching } = useQueryUsers()

  return (
    <div className={classes.root}>
      {!error && !isFetching ? (
        <>
          {users?.map((user) => (
            <CardUser key={user.id} user={user} />
          ))}
        </>
      ) : (
        <DelayedLoader />
      )}
    </div>
  )
}
