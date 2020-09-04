import React from "react"
import decoratorCentered from "@storybook/addon-centered"
import { ButtonLoader } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "ButtonLoader",
  decorators: [decoratorCentered],
}

export const example = () => <ButtonLoader name="ButtonLoader" />
