import { makeStyles } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import React, { Suspense, lazy } from "react"
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from "react-query"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Content } from "../Content"
import { DelayedLoader } from "../DelayedLoader"
import { Navigation } from "../Navigation"
import { ScrollToTop } from "../ScrollToTop"
import "./styles.css"
import { SlowDownContextProvider } from "../SlowDownContextProvider"

const NotFound = lazy(() => import("../RouteNotFound"))

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
}))

const queryConfig: ReactQueryProviderConfig = {
  queries: { refetchOnWindowFocus: false },
}

export function App() {
  const classes = useStyles()

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <SlowDownContextProvider>
        <Suspense fallback={null}>
          <Router>
            <div className={classes.root}>
              <ScrollToTop />
              <CssBaseline />
              <Navigation />
              <main id="scrollToTop" className={classes.content}>
                <div className={classes.toolbar} />
                <Suspense fallback={<DelayedLoader />}>
                  <Switch>
                    <Route path="/404" component={NotFound} />
                    <Route>
                      <Content />
                    </Route>
                  </Switch>
                </Suspense>
              </main>
            </div>
          </Router>
        </Suspense>
      </SlowDownContextProvider>
    </ReactQueryConfigProvider>
  )
}
