import {Meta, StoryObj} from "@storybook/react";
import {Progress} from "./progress";

const meta: Meta = {
  title: 'Molecules/Progress',
  component: Progress,
  argTypes: {
    percent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1
      }
    }
  }
}

export default meta

export const Default: StoryObj = {
  args: {
    percent: 50,
  }
}
