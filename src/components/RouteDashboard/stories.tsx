import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteDashboard from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteDashboard",
  decorators: [decoratorCentered],
}

export const example = () => <RouteDashboard />
