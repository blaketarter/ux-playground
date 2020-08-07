import React, { lazy } from "react"
import { Redirect, Route, Switch } from "react-router-dom"

const Skeleton = lazy(() => import("../RouteSkeleton"))

export function Content() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Skeleton} />
        <Redirect to="/404" />
      </Switch>
    </>
  )
}
