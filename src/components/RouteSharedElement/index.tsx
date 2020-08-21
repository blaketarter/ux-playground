import { Box, Button, makeStyles } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import React, { useLayoutEffect, useRef, useState } from "react"
import { Link, Route, Switch, useHistory } from "react-router-dom"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { CardUser } from "../CardUser"
import { DelayedLoader } from "../DelayedLoader"
import { ListCardUser } from "../ListCardUser"

// https://medium.com/@prateekbh/shared-elements-transitions-for-web-6fa9d31d4d6a
const transitionSpeed = 500

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

export default function RouteSharedElement() {
  const classes = useStyles()
  const { data: users, error, isFetching } = useQueryUsers()
  const history = useHistory()

  const ghostLayerRef = useRef<HTMLDivElement | null>(null)
  const sharedElementRef = useRef<HTMLDivElement | null>(null)
  const sharedTargetRef = useRef<HTMLDivElement | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useLayoutEffect(() => {
    if (
      isAnimating &&
      ghostLayerRef.current &&
      sharedElementRef.current &&
      sharedTargetRef.current
    ) {
      const sharedElementRefBoundingBox = sharedElementRef.current.getBoundingClientRect()
      const sharedTargetRefBoundingBox = sharedTargetRef.current.getBoundingClientRect()

      const verticalTravelDistance =
        sharedTargetRefBoundingBox.top -
        sharedElementRefBoundingBox.top +
        (document.getElementById("scrollToTop")?.scrollTop ?? 0)
      const horizontalTravelDistance =
        sharedTargetRefBoundingBox.left - sharedElementRefBoundingBox.left
      const height = sharedTargetRefBoundingBox.height
      const width = sharedTargetRefBoundingBox.width

      ghostLayerRef.current.addEventListener(
        "transitionend",
        () => {
          if (sharedElementRef.current) {
            ghostLayerRef.current?.childNodes.forEach((child) =>
              ghostLayerRef.current?.removeChild(child),
            )
          }
          setIsAnimating(false)
        },
        { once: true },
      )

      requestAnimationFrame(() => {
        if (sharedElementRef.current) {
          sharedElementRef.current.style.transform = `translateY(${verticalTravelDistance}px) translateX(${horizontalTravelDistance}px)`
          sharedElementRef.current.style.width = `${width}px`
          sharedElementRef.current.style.height = `${height}px`
        }
      })
    }
  })

  return (
    <div className={classes.root}>
      <Switch>
        <Route path="/shared/:id">
          {({ match }) => (
            <>
              <Box maxWidth={1000} marginX="auto">
                <Link to="/shared">
                  <Button startIcon={<ChevronLeftIcon />}>Back</Button>
                </Link>
              </Box>
              {!error && !isFetching ? (
                <CardUser
                  style={{
                    opacity: isAnimating ? 0 : 1,
                  }}
                  ref={sharedTargetRef}
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
            users={!error && !isFetching && users ? users : []}
            onClick={(e, user) => {
              if (ghostLayerRef.current) {
                const el = e.currentTarget.cloneNode(true) as HTMLDivElement

                const boundingRect = e.currentTarget.getBoundingClientRect()

                el.style.position = "fixed"
                el.style.top = `${boundingRect.top}px`
                el.style.left = `${boundingRect.left}px`
                el.style.height = `${boundingRect.height}px`
                el.style.width = `${boundingRect.width}px`
                el.style.transition = `${transitionSpeed}ms ease`

                sharedElementRef.current = ghostLayerRef.current.appendChild(el)

                setIsAnimating(true)
              }

              if (user) {
                history.push(`/shared/${user.id}`)
              }
            }}
          />
        </Route>
      </Switch>
      <div className={classes.ghostLayer} ref={ghostLayerRef} />
    </div>
  )
}
