import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteAnimateAfterScroll from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteAnimateAfterScroll",
  decorators: [decoratorCentered],
}

export const example = () => <RouteAnimateAfterScroll />
