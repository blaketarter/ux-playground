import { makeStyles } from "@material-ui/core"
import React, { useState } from "react"
import { Route, Switch } from "react-router-dom"
import { RouteSharedElementDetail } from "../RouteSharedElementDetail"
import { RouteSharedElementList } from "../RouteSharedElementList"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    position: "relative",
  },
}))

export default function RouteSharedElement() {
  const classes = useStyles()
  const [triggerId, setTriggerId] = useState<number | null>(null)

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/shared/:id">
          <RouteSharedElementDetail setTriggerId={setTriggerId} />
        </Route>
        <Route>
          <RouteSharedElementList triggerId={triggerId} />
        </Route>
      </Switch>
    </div>
  )
}
