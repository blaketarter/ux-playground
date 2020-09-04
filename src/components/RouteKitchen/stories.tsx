import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import RouteKitchen from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "RouteKitchen",
  decorators: [decoratorCentered],
}

export const example = () => <RouteKitchen />
