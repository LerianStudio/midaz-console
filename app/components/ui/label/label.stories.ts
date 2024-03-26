import { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'

const meta: Meta = {
  title: 'Molecules/Label',
  component: Label,
  argTypes: {
    className: {
      type: 'string',
      description: "The label's class"
    },
    children: {
      type: 'string',
      description: "The label's text"
    }
  }
}

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Label'
  }
}
