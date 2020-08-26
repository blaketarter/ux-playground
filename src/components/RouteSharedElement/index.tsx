import { Box, Button, makeStyles } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import React, { useState } from "react"
import { Link, Route, Switch, useHistory } from "react-router-dom"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { CardUser } from "../CardUser"
import { DelayedLoader } from "../DelayedLoader"
import { ListCardUser } from "../ListCardUser"
import { useSharedElement } from "../SharedElement"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    position: "relative",
  },
  ghostLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 9999,
  },
}))

// move the two routes to separate components
export default function RouteSharedElement() {
  const classes = useStyles()
  const { data: users, error, isFetching } = useQueryUsers()
  const history = useHistory()

  const [
    { sharedTargetRef, isAnimating },
    { startAnimation },
  ] = useSharedElement()
  const [triggerId, setTriggerId] = useState<number | null>(null)

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/shared/:id">
          {({ match }) => (
            <>
              <Box maxWidth={1000} marginX="auto">
                <Link
                  to="/shared"
                  onClick={(e) => {
                    e.preventDefault()
                    setTriggerId(Number(match?.params.id))

                    if (sharedTargetRef.current) {
                      startAnimation(sharedTargetRef.current, {
                        restoreScrollPosition: true,
                      })
                    }

                    history.push("/shared")
                  }}
                >
                  <Button startIcon={<ChevronLeftIcon />}>Back</Button>
                </Link>
              </Box>
              {!error && !isFetching ? (
                <CardUser
                  ref={sharedTargetRef}
                  style={{
                    opacity: isAnimating ? 0 : 1,
                  }}
                  user={users?.find(
                    (user) => user.id === Number(match?.params.id),
                  )}
                  expanded={true}
                />
              ) : (
                <DelayedLoader delay={50}>
                  <CardUser isSkeleton expanded={true} />
                </DelayedLoader>
              )}
            </>
          )}
        </Route>
        <Route>
          <ListCardUser
            style={{
              opacity: isAnimating ? 0 : 1,
            }}
            users={!error && !isFetching && users ? users : []}
            onClick={(e, user) => {
              e.preventDefault()
              startAnimation(e.currentTarget, {
                captureScrollPosition: true,
              })

              if (user) {
                history.push(`/shared/${user.id}`)
              }
            }}
            cardRef={(user) =>
              user.id === triggerId ? sharedTargetRef : undefined
            }
          />
        </Route>
      </Switch>
    </div>
  )
}
