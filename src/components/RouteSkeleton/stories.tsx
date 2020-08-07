import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteSkeleton from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteSkeleton",
  decorators: [decoratorCentered],
}

export const example = () => <RouteSkeleton />
