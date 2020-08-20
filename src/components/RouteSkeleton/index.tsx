import { makeStyles } from "@material-ui/core"
import React from "react"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { CardUser } from "../CardUser"
import { DelayedLoader } from "../DelayedLoader"
import { ListCardUser } from "../ListCardUser"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}))

export default function RouteSkeleton() {
  const classes = useStyles()
  const { data: users, error, isFetching } = useQueryUsers()

  return (
    <div className={classes.root}>
      {!error && !isFetching ? (
        <ListCardUser users={users ?? []} />
      ) : (
        <DelayedLoader delay={50}>
          <CardUser isSkeleton />
          <CardUser isSkeleton />
          <CardUser isSkeleton />
          <CardUser isSkeleton />
        </DelayedLoader>
      )}
    </div>
  )
}
