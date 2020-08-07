import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { Navigation } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Navigation",
  decorators: [decoratorCentered],
}

export const example = () => <Navigation />
