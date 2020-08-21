import React, { ComponentProps, ElementType, ReactElement } from "react"
import { User } from "../../types/User"
import { CardUser } from "../CardUser"

interface Props {
  users: User[]
  itemWrapper?: ElementType<{ index: number; children: ReactElement }>
  isFetching?: boolean
  onClick?: ComponentProps<typeof CardUser>["onClick"]
}

export function ListCardUser({
  users,
  onClick,
  itemWrapper: ItemWrapper,
}: Props) {
  return (
    <>
      {users?.map((user, index) => {
        const card = <CardUser key={user.id} user={user} onClick={onClick} />

        return ItemWrapper ? (
          <ItemWrapper key={user.id} index={index}>
            {card}
          </ItemWrapper>
        ) : (
          card
        )
      })}
    </>
  )
}
