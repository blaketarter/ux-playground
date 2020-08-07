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
  Switch,
  Toolbar,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core"
import DashboardIcon from "@material-ui/icons/Dashboard"
// import FlipToFrontIcon from "@material-ui/icons/FlipToFront"
import MenuIcon from "@material-ui/icons/Menu"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import RefreshIcon from "@material-ui/icons/Refresh"
import React from "react"
import { queryCache } from "react-query"
import { NavLink } from "react-router-dom"
import { useSlowDown } from "../../utils/useSlowDown"

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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  refresh: {
    textTransform: "initial",
  },
}))

export function Navigation() {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { slowDown, setSlowDown } = useSlowDown()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem
          component={NavLink}
          exact
          to="/"
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
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Skeleton Content" />
        </ListItem>
        {/* <ListItem
          component={NavLink}
          to="/shared"
          activeClassName="Mui-selected"
        >
          <ListItemIcon>
            <FlipToFrontIcon />
          </ListItemIcon>
          <ListItemText primary="Shared Element Transition" />
        </ListItem> */}
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
            <FormControlLabel
              control={
                <Switch
                  checked={slowDown}
                  onChange={() => setSlowDown(!slowDown)}
                  name="slow"
                />
              }
              label="Slow"
            />
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
