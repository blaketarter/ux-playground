import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteSpinner from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteSpinner",
  decorators: [decoratorCentered],
}

export const example = () => <RouteSpinner />
