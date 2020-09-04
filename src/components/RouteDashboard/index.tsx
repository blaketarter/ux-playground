import { Box, Card, makeStyles } from "@material-ui/core"
import classNames from "classnames"
import React from "react"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { DelayedFade } from "../DelayedFade"
import { DelayedLoader } from "../DelayedLoader"
import { ListCardUser } from "../ListCardUser"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    flexGrow: 1,
  },
  grid: {
    display: "grid",
    gridTemplate: `
      "a a a" 120px
      "b c c" 200px
      "b c c" 200px / 1fr 1fr 1fr`,
    gridGap: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(1),
    flex: "1 0 140px",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  areaA: {
    gridArea: "a",
    display: "flex",
    background: theme.palette.primary.main,
    padding: theme.spacing(2, 0, 0, 2),
  },
  areaC: {
    gridArea: "c",
    display: "flex",
    flexWrap: "wrap",
    marginRight: -theme.spacing(2),
  },
  areaB: {
    gridArea: "b",
    display: "flex",
    "& > *": {
      marginRight: 0,
    },
  },
}))

export default function RouteDashboard() {
  const classes = useStyles()
  const { data: users, isFetching } = useQueryUsers()

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        <DelayedFade in delay={300} timeout={500}>
          <Box className={classNames(classes.areaA)}>
            <Card className={classes.card}>1</Card>
            <Card className={classes.card}>2</Card>
            <Card className={classes.card}>3</Card>
          </Box>
        </DelayedFade>
        <DelayedFade in delay={500} timeout={500}>
          <Box className={classNames(classes.areaB)}>
            <Card className={classes.card}>4</Card>
          </Box>
        </DelayedFade>
        <DelayedFade in delay={700} timeout={500}>
          <Box className={classNames(classes.areaC)}>
            <Card className={classes.card}>5</Card>
            <Card className={classes.card}>6</Card>
            <Card className={classes.card}>7</Card>
            <Card className={classes.card}>8</Card>
          </Box>
        </DelayedFade>
      </div>
      <DelayedFade in delay={900} timeout={500}>
        <div>
          {isFetching || !users ? (
            <DelayedLoader />
          ) : (
            <ListCardUser users={users} />
          )}
        </div>
      </DelayedFade>
    </div>
  )
}
