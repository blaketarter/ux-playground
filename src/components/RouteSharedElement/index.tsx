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
  const sharedTriggerRef = useRef<HTMLDivElement | null>(null)
  const sharedElementRef = useRef<HTMLDivElement | null>(null)
  const sharedTargetRef = useRef<HTMLDivElement | null>(null)
  const [transitionState, setTransitionState] = useState<
    "none" | "forwards" | "backwards"
  >("none")
  const [triggerId, setTriggerId] = useState<number | null>(null)
  const [previousScroll, setPreviousScroll] = useState<number | null>(null)

  useLayoutEffect(() => {
    if (
      transitionState === "forwards" &&
      ghostLayerRef.current &&
      sharedElementRef.current &&
      sharedTargetRef.current
    ) {
      const sharedElementRefBoundingBox = sharedElementRef.current.getBoundingClientRect()
      const sharedTargetRefBoundingBox = sharedTargetRef.current.getBoundingClientRect()

      const verticalTravelDistance =
        sharedTargetRefBoundingBox.top - sharedElementRefBoundingBox.top + 24
      const horizontalTravelDistance =
        sharedTargetRefBoundingBox.left - sharedElementRefBoundingBox.left
      const height = sharedTargetRefBoundingBox.height
      const width = sharedTargetRefBoundingBox.width

      const cleanup = () => {
        if (sharedElementRef.current) {
          ghostLayerRef.current?.childNodes.forEach((child) => {
            if (child === sharedElementRef.current) {
              ghostLayerRef.current?.removeChild(child)
            }
          })
        }
        setTransitionState("none")
        ghostLayerRef.current?.removeEventListener("transitionend", cleanup)
      }

      ghostLayerRef.current.addEventListener("transitionend", cleanup, {
        once: true,
      })

      requestAnimationFrame(() => {
        if (sharedElementRef.current) {
          sharedElementRef.current.style.transform = `translateY(${verticalTravelDistance}px) translateX(${horizontalTravelDistance}px)`
          sharedElementRef.current.style.width = `${width}px`
          sharedElementRef.current.style.height = `${height}px`
        }
      })
    }

    if (
      transitionState === "backwards" &&
      ghostLayerRef.current &&
      sharedElementRef.current &&
      sharedTriggerRef.current
    ) {
      document
        .getElementById("scrollToTop")
        ?.scrollTo(0, previousScroll ?? sharedTriggerRef.current.offsetTop)

      const sharedElementRefBoundingBox = sharedElementRef.current.getBoundingClientRect()
      const sharedTriggerRefBoundingBox = sharedTriggerRef.current.getBoundingClientRect()

      const verticalTravelDistance =
        sharedTriggerRefBoundingBox.top - sharedElementRefBoundingBox.top + 24
      const horizontalTravelDistance =
        sharedTriggerRefBoundingBox.left - sharedElementRefBoundingBox.left
      const height = sharedTriggerRefBoundingBox.height
      const width = sharedTriggerRefBoundingBox.width

      const cleanup = () => {
        if (sharedElementRef.current) {
          ghostLayerRef.current?.childNodes.forEach((child) => {
            if (child === sharedElementRef.current) {
              ghostLayerRef.current?.removeChild(child)
            }
          })
        }
        setTransitionState("none")
        ghostLayerRef.current?.removeEventListener("transitionend", cleanup)
      }

      ghostLayerRef.current.addEventListener("transitionend", cleanup, {
        once: true,
      })

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
                <Link
                  to="/shared"
                  onClick={(e) => {
                    e.preventDefault()

                    if (sharedTargetRef.current && ghostLayerRef.current) {
                      const el = sharedTargetRef.current.cloneNode(
                        true,
                      ) as HTMLDivElement

                      const boundingRect = sharedTargetRef.current.getBoundingClientRect()

                      el.style.position = "fixed"
                      el.style.top = `${boundingRect.top}px`
                      el.style.left = `${boundingRect.left}px`
                      el.style.height = `${boundingRect.height}px`
                      el.style.width = `${boundingRect.width}px`
                      el.style.transition = `${transitionSpeed}ms ease`

                      sharedElementRef.current = ghostLayerRef.current.appendChild(
                        el,
                      )

                      setTriggerId(Number(match?.params.id))
                      setTransitionState("backwards")
                    }

                    history.push("/shared")
                  }}
                >
                  <Button startIcon={<ChevronLeftIcon />}>Back</Button>
                </Link>
              </Box>
              {!error && !isFetching ? (
                <CardUser
                  style={{
                    opacity: transitionState === "none" ? 1 : 0,
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
            style={{
              opacity: transitionState === "none" ? 1 : 0,
            }}
            users={!error && !isFetching && users ? users : []}
            onClick={(e, user) => {
              if (ghostLayerRef.current) {
                setPreviousScroll(
                  document.getElementById("scrollToTop")?.scrollTop ?? null,
                )

                const el = e.currentTarget.cloneNode(true) as HTMLDivElement

                const boundingRect = e.currentTarget.getBoundingClientRect()

                el.style.position = "fixed"
                el.style.top = `${boundingRect.top}px`
                el.style.left = `${boundingRect.left}px`
                el.style.height = `${boundingRect.height}px`
                el.style.width = `${boundingRect.width}px`
                el.style.transition = `${transitionSpeed}ms ease`

                sharedElementRef.current = ghostLayerRef.current.appendChild(el)

                setTransitionState("forwards")
              }

              if (user) {
                history.push(`/shared/${user.id}`)
              }
            }}
            cardRef={(user) =>
              user.id === triggerId ? sharedTriggerRef : undefined
            }
          />
        </Route>
      </Switch>
      <div className={classes.ghostLayer} ref={ghostLayerRef} />
    </div>
  )
}
