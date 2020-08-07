import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { DelayedLoader } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "DelayedLoader",
  decorators: [decoratorCentered],
}

export const example = () => <DelayedLoader />
