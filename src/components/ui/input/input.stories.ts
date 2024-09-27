import { Meta, StoryObj } from '@storybook/react'
import { InputProps, Input } from './input'

const meta: Meta<InputProps> = {
  title: 'Primitives/Input',
  component: Input,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'If the input is disabled'
    },
    className: {
      type: 'string',
      description: "The input's class"
    }
  }
}

export default meta

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: 'Input'
  }
}
