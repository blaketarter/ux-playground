import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteSharedElement from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteSharedElement",
  decorators: [decoratorCentered],
}

export const example = () => <RouteSharedElement />
