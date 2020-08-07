import React, { lazy } from "react"
import { Redirect, Route, Switch } from "react-router-dom"

const Spinner = lazy(() => import("../RouteSpinner"))
const Skeleton = lazy(() => import("../RouteSkeleton"))

export function Content() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Spinner} />
        <Route path="/skeleton" component={Skeleton} />
        <Redirect to="/404" push />
      </Switch>
    </>
  )
}
