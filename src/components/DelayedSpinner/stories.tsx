import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { DelayedSpinner } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "DelayedSpinner",
  decorators: [decoratorCentered],
}

export const example = () => <DelayedSpinner />
