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
import React from "react"
import { queryCache } from "react-query"
import { NavLink } from "react-router-dom"
import {
  defaultSlowDownContextState,
  useSlowDown,
} from "../../utils/useSlowDown"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
    width: drawerWidth,
  },
  refresh: {
    textTransform: "initial",
  },
  subtitle: {
    padding: theme.spacing(2),
  },
}))

export function Navigation() {
  const classes = useStyles()
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

  const drawer = (
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
  )

  const container =
    window !== undefined ? () => window.document.body : undefined

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
                Refresh
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
          </Drawer>
        </Hidden>
      </nav>
    </>
  )
}
