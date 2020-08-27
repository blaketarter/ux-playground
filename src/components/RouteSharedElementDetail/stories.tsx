import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { RouteSharedElementDetail } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteSharedElementDetail",
  decorators: [decoratorCentered],
}

export const example = () => <RouteSharedElementDetail />
