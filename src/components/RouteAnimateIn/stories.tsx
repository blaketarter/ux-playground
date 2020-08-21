import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteAnimateIn from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteAnimateIn",
  decorators: [decoratorCentered],
}

export const example = () => <RouteAnimateIn />
