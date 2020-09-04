import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { DelayedFade } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "DelayedFade",
  decorators: [decoratorCentered],
}

export const example = () => <DelayedFade />
