import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { CardUser } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "CardUser",
  decorators: [decoratorCentered],
}

export const example = () => (
  <CardUser
    user={{
      id: 1,
      name: "Test Name",
      username: "tester",
      email: "test@example.com",
      phone: "(555) 555-5555",
      website: "https://example.com",
    }}
  />
)
