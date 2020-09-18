import decoratorCentered from "@storybook/addon-centered"
import React from "react"
import { ButtonHoldToConfirm } from "."

/**
 * See Storybook Docs: Writing Stories
 * https://storybook.js.org/docs/basics/writing-stories/
 */

export default {
  title: "ButtonHoldToConfirm",
  decorators: [decoratorCentered],
}

export const example = () => <ButtonHoldToConfirm confirmMS={1000} />
