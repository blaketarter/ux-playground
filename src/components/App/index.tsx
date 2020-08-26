import { makeStyles } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import React, { Suspense, lazy, useRef } from "react"
import { ReactQueryConfigProvider, ReactQueryProviderConfig } from "react-query"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Content } from "../Content"
import { DelayedLoader } from "../DelayedLoader"
import { Navigation } from "../Navigation"
import { ScrollToTop } from "../ScrollToTop"
import "./styles.css"
import { SharedElementProvider } from "../SharedElement"
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
  ghostLayer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    pointerEvents: "none",
  },
}))

const queryConfig: ReactQueryProviderConfig = {
  queries: { refetchOnWindowFocus: false },
}

export function App() {
  const classes = useStyles()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <SlowDownContextProvider>
        <Suspense fallback={null}>
          <Router>
            <div className={classes.root}>
              <ScrollToTop scrollRef={scrollRef} />
              <CssBaseline />
              <Navigation />
              <SharedElementProvider
                scrollElementRef={scrollRef}
                ghostLayerProps={{
                  className: classes.ghostLayer,
                }}
              >
                <main
                  id="scrollToTop"
                  className={classes.content}
                  ref={scrollRef}
                >
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
              </SharedElementProvider>
            </div>
          </Router>
        </Suspense>
      </SlowDownContextProvider>
    </ReactQueryConfigProvider>
  )
}
