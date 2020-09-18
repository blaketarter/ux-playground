import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Switch,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core"
import DashboardIcon from "@material-ui/icons/Dashboard"
import DehazeIcon from "@material-ui/icons/Dehaze"
// import FeaturedVideoIcon from "@material-ui/icons/FeaturedVideo"
import FlipToFrontIcon from "@material-ui/icons/FlipToFront"
import HeightIcon from "@material-ui/icons/Height"
import KitchenIcon from "@material-ui/icons/Kitchen"
import LineStyleIcon from "@material-ui/icons/LineStyle"
import MenuIcon from "@material-ui/icons/Menu"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import RefreshIcon from "@material-ui/icons/Refresh"
import React, { useCallback, useMemo, useState } from "react"
import { queryCache } from "react-query"
import { NavLink } from "react-router-dom"
import {
  defaultSlowDownContextState,
  useSlowDown,
} from "../../utils/useSlowDown"

type StyleProps = {
  drawerWidth: number
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }: StyleProps) => drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }: StyleProps) => `calc(100% - ${drawerWidth}px)`,
      marginLeft: ({ drawerWidth }: StyleProps) => drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerPaper: {
    [theme.breakpoints.down("xs")]: {
      width: 240,
    },
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }: StyleProps) => drawerWidth,
    },
  },
  refresh: {
    textTransform: "initial",
  },
  subtitle: {
    padding: theme.spacing(2),
  },
  sidebarHandle: {
    height: "100%",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "9px",
    background: theme.palette.grey[200],
    cursor: "ew-resize",
    transition: "200ms ease",
    "&:hover": {
      background: theme.palette.grey[300],
    },
    "&:after": {
      content: "''",
      display: "block",
      height: "5%",
      width: 3,
      borderRadius: 3,
      background: theme.palette.grey[400],
      margin: "0 auto",
      position: "relative",
      top: "47.5%",
    },
  },
}))

const calculateDrawerWidth = (pageX: number) =>
  Math.max(240, Math.min(window.innerWidth - 240, pageX))

export function Navigation() {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const {
    slowRequest,
    setSlowRequest,
    slowRequestMinimum,
    setSlowRequestMinimum,
  } = useSlowDown()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [drawerWidth, setDrawerWidth] = useState(
    parseInt(localStorage.getItem("drawerWidth") ?? "240"),
  )
  const classes = useStyles({ drawerWidth })

  const drawer = useMemo(
    () => (
      <div>
        <div className={classes.toolbar}>
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={1}
            py={1}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={slowRequest}
                  onChange={() => setSlowRequest(!slowRequest)}
                  name="slow"
                />
              }
              label="Slow"
            />
            <Select
              autoWidth={true}
              fullWidth={true}
              name="slowRequestMinimum"
              value={slowRequestMinimum}
              onChange={(e) => {
                setSlowRequestMinimum(Number(e.target.value))
              }}
            >
              {[0.1, 0.5, 1, 2, 5].map((multiplier) => {
                const amount =
                  defaultSlowDownContextState.slowRequestMinimum * multiplier

                return (
                  <MenuItem key={amount} value={amount}>
                    {amount}ms
                  </MenuItem>
                )
              })}
            </Select>
          </Box>
        </div>
        <List>
          <ListItem
            component={NavLink}
            exact
            to="/"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <KitchenIcon />
            </ListItemIcon>
            <ListItemText primary="Kitchen Sink" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <Typography variant="subtitle2" className={classes.subtitle}>
            Loading Interactions
          </Typography>
          <ListItem
            component={NavLink}
            exact
            to="/spinner"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <RadioButtonUncheckedIcon />
            </ListItemIcon>
            <ListItemText primary="Spinner" />
          </ListItem>
          <ListItem
            component={NavLink}
            to="/skeleton"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <LineStyleIcon />
            </ListItemIcon>
            <ListItemText primary="Skeleton Content" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <Typography variant="subtitle2" className={classes.subtitle}>
            Transition Interactions
          </Typography>
          <ListItem
            component={NavLink}
            to="/animate"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <DehazeIcon />
            </ListItemIcon>
            <ListItemText primary="Staggered Fade In" />
          </ListItem>
          <ListItem
            component={NavLink}
            to="/shared"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <FlipToFrontIcon />
            </ListItemIcon>
            <ListItemText primary="Shared Element Transition" />
          </ListItem>
          <ListItem
            component={NavLink}
            to="/dashboard"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard Fade In" />
          </ListItem>
          <ListItem
            component={NavLink}
            to="/scroll"
            activeClassName="Mui-selected"
          >
            <ListItemIcon>
              <HeightIcon />
            </ListItemIcon>
            <ListItemText primary="Animate After Scroll" />
          </ListItem>
        </List>
      </div>
    ),
    [
      classes.subtitle,
      classes.toolbar,
      setSlowRequest,
      setSlowRequestMinimum,
      slowRequest,
      slowRequestMinimum,
    ],
  )

  const container =
    window !== undefined ? () => window.document.body : undefined

  const updateDrawerWidth = useCallback((e: MouseEvent) => {
    setDrawerWidth(calculateDrawerWidth(e.pageX))
  }, [])

  const onMouseUp = useCallback(
    (e: MouseEvent) => {
      localStorage.setItem("drawerWidth", `${calculateDrawerWidth(e.pageX)}`)
      document.removeEventListener("mousemove", updateDrawerWidth)
      document.removeEventListener("mouseup", onMouseUp)
    },
    [updateDrawerWidth],
  )

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            UX Playground
          </Typography>
          <Box ml="auto" display="flex">
            <Box mr={1}>
              <Button
                className={classes.refresh}
                color="inherit"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  queryCache.invalidateQueries(true)
                }}
              >
                Refresh Data
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
            <div
              className={classes.sidebarHandle}
              onMouseDown={(e) => {
                // only left click
                if (e.button === 0) {
                  e.preventDefault()
                  e.stopPropagation()
                  document.addEventListener("mousemove", updateDrawerWidth)
                  document.addEventListener("mouseup", onMouseUp)
                }
              }}
            />
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}
