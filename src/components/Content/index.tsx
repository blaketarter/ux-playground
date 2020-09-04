import React, { lazy } from "react"
import { Redirect, Route, Switch } from "react-router-dom"

const Kitchen = lazy(() => import("../RouteKitchen"))
const Spinner = lazy(() => import("../RouteSpinner"))
const Skeleton = lazy(() => import("../RouteSkeleton"))
const Animate = lazy(() => import("../RouteAnimateIn"))
const Shared = lazy(() => import("../RouteSharedElement"))

export function Content() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Kitchen} />
        <Route path="/spinner" exact component={Spinner} />
        <Route path="/skeleton" component={Skeleton} />
        <Route path="/animate" component={Animate} />
        <Route path="/shared" component={Shared} />
        <Redirect to="/404" push />
      </Switch>
    </>
  )
}
