import { makeStyles } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import "./styles.css"
import { Content } from "../Content"
import { Navigation } from "../Navigation"
import { NotFound } from "../NotFound"

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
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Navigation />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/404">
              <NotFound />
            </Route>
            <Route>
              <Content />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}
