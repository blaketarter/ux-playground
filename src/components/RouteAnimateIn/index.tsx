import { Fade, makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"
import { useQueryUsers } from "../../utils/useQueryUsers"
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
  <Fade in={true} timeout={300 * (index + 1)}>
    {children}
  </Fade>
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
