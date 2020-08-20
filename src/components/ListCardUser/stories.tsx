import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { ListCardUser } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "ListCardUser",
  decorators: [decoratorCentered],
}

export const example = () => (
  <ListCardUser
    users={[
      {
        id: 1,
        name: "Test Name 1",
        username: "tester1",
        email: "test1@example.com",
        phone: "(111) 111-1111",
        website: "https://example.com/1",
      },
      {
        id: 2,
        name: "Test Name 2",
        username: "tester2",
        email: "test2@example.com",
        phone: "(222) 222-2222",
        website: "https://example.com/2s",
      },
    ]}
  />
)
