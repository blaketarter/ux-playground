import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { Content } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "Content",
  decorators: [decoratorCentered],
}

export const example = () => <Content />
