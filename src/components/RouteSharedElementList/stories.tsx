import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { RouteSharedElementList } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteSharedElementList",
  decorators: [decoratorCentered],
}

export const example = () => <RouteSharedElementList />
