import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { FadeAfterScroll } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "FadeAfterScroll",
  decorators: [decoratorCentered],
}

export const example = () => <FadeAfterScroll />
