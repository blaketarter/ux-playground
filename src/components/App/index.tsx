import { makeStyles } from "@material-ui/core"
import CssBaseline from "@material-ui/core/CssBaseline"
import React from "react"
import "./styles.css"
import { Content } from "../Content"
import { Navigation } from "../Navigation"

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
    <div className={classes.root}>
      <CssBaseline />
      <Navigation />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </main>
    </div>
  )
}
