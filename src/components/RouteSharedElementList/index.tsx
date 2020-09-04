import React from "react"
import { useHistory } from "react-router-dom"
import { useQueryUsers } from "../../utils/useQueryUsers"
import { ListCardUser } from "../ListCardUser"
import { useSharedElement } from "../SharedElement"

interface Props {
  triggerId?: number | null
}

export function RouteSharedElementList({ triggerId }: Props) {
  const { data: users, error } = useQueryUsers()
  const history = useHistory()

  const [
    { sharedTargetRef, isAnimating },
    { startAnimation },
  ] = useSharedElement()

  return (
    <ListCardUser
      style={{
        opacity: isAnimating ? 0 : 1,
      }}
      users={!error && users ? users : []}
      onClick={(e, user) => {
        const id = user?.id
        e.preventDefault()
        startAnimation(
          e.currentTarget,
          () => {
            if (id) {
              history.push(`/shared/${id}`, user)
            }
          },
          {
            captureScrollPosition: true,
          },
        )
      }}
      cardRef={(user) => (user.id === triggerId ? sharedTargetRef : undefined)}
    />
  )
}
