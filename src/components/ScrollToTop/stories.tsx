import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { ScrollToTop } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "ScrollToTop",
  decorators: [decoratorCentered],
}

export const example = () => <ScrollToTop />
