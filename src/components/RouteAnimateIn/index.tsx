import { makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { DelayedFade } from "../DelayedFade"
import { ListCardUser } from "../ListCardUser"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
  },
}))

const FadeIn = ({
  children,
  index,
}: {
  children: ReactElement
  index: number
}) => (
  <DelayedFade in={true} delay={100 * index} timeout={400}>
    {children}
  </DelayedFade>
)

export default function RouteAnimateIn() {
  const classes = useStyles()
  const { data: users, error, isFetching } = useQueryUsers()

  return (
    <div className={classes.root}>
      <ListCardUser
        users={!error && !isFetching && users ? users : []}
        itemWrapper={FadeIn}
      />
    </div>
  )
}
