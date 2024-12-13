import { Meta, StoryObj } from '@storybook/react'
import { ButtonProps, Button } from '.'
import { Users } from 'lucide-react'

const meta: Meta<ButtonProps> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
      description: "The button's content"
    },
    disabled: {
      type: 'boolean',
      description: 'If the button is disabled'
    },
    className: {
      type: 'string',
      description: "The button's class"
    }
  }
}

export default meta

export const Primary: StoryObj<ButtonProps> = {
  args: {
    children: 'Button'
  }
}

export const Disabled: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
    disabled: true
  }
}

export const Secundary: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
    variant: 'secondary'
  }
}

export const SecundaryDisabled: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
    variant: 'secondary',
    disabled: true
  }
}

export const Outline: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
    variant: 'outline'
  }
}

export const FullWidth: StoryObj<ButtonProps> = {
  args: {
    fullWidth: true,
    children: 'Button'
  },
  render: (args) => <Button {...args} />
}

export const WithIcon: StoryObj<ButtonProps> = {
  args: {
    children: 'Button'
  },
  render: (args) => <Button icon={<Users />} {...args} />
}

export const WithIconEnd: StoryObj<ButtonProps> = {
  args: {
    fullWidth: true,
    iconPlacement: 'end',
    children: 'Button'
  },
  render: (args) => <Button icon={<Users />} {...args} />
}
