import { makeStyles } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import React, { Suspense, lazy } from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Content } from "../Content"
import { DelayedSpinner } from "../DelayedSpinner"
import { Navigation } from "../Navigation"
import { ScrollToTop } from "../ScrollToTop"
import "./styles.css"

const NotFound = lazy(() => import("../RouteNotFound"))

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

export function App() {
  const classes = useStyles()

  return (
    <Suspense fallback={DelayedSpinner}>
      <Router>
        <div className={classes.root}>
          <ScrollToTop />
          <CssBaseline />
          <Navigation />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path="/404" component={NotFound} />
              <Route>
                <Content />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </Suspense>
  )
}
