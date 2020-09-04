import { Box, Button } from "@material-ui/core"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import React from "react"
import { Link, useHistory, useRouteMatch } from "react-router-dom"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { CardUser } from "../CardUser"
import { DelayedLoader } from "../DelayedLoader"
import { useSharedElement } from "../SharedElement"

interface Props {
  setTriggerId?: (triggerId: number | null) => unknown
}

export function RouteSharedElementDetail({ setTriggerId }: Props) {
  const { data: users, error, isFetching } = useQueryUsers()
  const history = useHistory()
  const match = useRouteMatch<{ id: string }>()

  const [
    { sharedTargetRef, isAnimating },
    { startAnimation },
  ] = useSharedElement()

  return (
    <>
      <Box maxWidth={1000} marginX="auto">
        <Link
          to="/shared"
          onClick={(e) => {
            e.preventDefault()
            setTriggerId?.(Number(match?.params.id))

            if (sharedTargetRef.current) {
              startAnimation(
                sharedTargetRef.current,
                () => {
                  history.push("/shared")
                },
                {
                  restoreScrollPosition: true,
                },
              )
            }
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
          user={users?.find((user) => user.id === Number(match?.params.id))}
          expanded={true}
        />
      ) : (
        <DelayedLoader delay={50}>
          <CardUser isSkeleton expanded={true} />
        </DelayedLoader>
      )}
    </>
  )
}
