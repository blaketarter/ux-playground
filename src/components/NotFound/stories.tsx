import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { NotFound } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "NotFound",
  decorators: [decoratorCentered],
}

export const example = () => <NotFound />
