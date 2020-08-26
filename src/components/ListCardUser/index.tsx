import React, {
  CSSProperties,
  ComponentProps,
  ElementType,
  MutableRefObject,
  ReactElement,
} from "react"
import { User } from "../../types/User"
import { CardUser } from "../CardUser"

interface Props {
  users: User[]
  itemWrapper?: ElementType<{
    user: User
    index: number
    children: ReactElement
  }>
  isFetching?: boolean
  onClick?: ComponentProps<typeof CardUser>["onClick"]
  cardRef?: (user: User) => MutableRefObject<HTMLElement | null> | undefined
  style?: CSSProperties
}

export function ListCardUser({
  users,
  onClick,
  itemWrapper: ItemWrapper,
  cardRef,
  style,
}: Props) {
  return (
    <div style={style}>
      {users?.map((user, index) => {
        const card = (
          <CardUser
            key={user.id}
            user={user}
            onClick={onClick}
            ref={cardRef?.(user)}
          />
        )

        return ItemWrapper ? (
          <ItemWrapper key={user.id} index={index} user={user}>
            {card}
          </ItemWrapper>
        ) : (
          card
        )
      })}
    </div>
  )
}
