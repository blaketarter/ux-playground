import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { DelayedSlide } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "DelayedSlide",
  decorators: [decoratorCentered],
}

export const example = () => <DelayedSlide />
