import React from "react"
import { User } from "../../types/User"
import { CardUser } from "../CardUser"

interface Props {
  users: User[]
}

export function ListCardUser({ users }: Props) {
  return (
    <>
      {users?.map((user) => (
        <CardUser key={user.id} user={user} />
      ))}
    </>
  )
}
