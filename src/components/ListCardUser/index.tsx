import React, { ElementType, ReactElement } from "react"
import { User } from "../../types/User"
import { CardUser } from "../CardUser"

interface Props {
  users: User[]
  itemWrapper?: ElementType<{ index: number; children: ReactElement }>
  isFetching?: boolean
}

export function ListCardUser({ users, itemWrapper: ItemWrapper }: Props) {
  return (
    <>
      {users?.map((user, index) => {
        const card = <CardUser key={user.id} user={user} />

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
