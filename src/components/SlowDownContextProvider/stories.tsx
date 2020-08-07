import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { SlowDownContextProvider } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "SlowDownContextProvider",
  decorators: [decoratorCentered],
}

export const example = () => <SlowDownContextProvider />
