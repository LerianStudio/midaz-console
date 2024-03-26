import { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardTitle,
  CardProps, CardHeader
} from './card'

const meta: Meta<CardProps> = {
  title: 'Molecules/Card',
  component: Card,
  argTypes: {
    children: {
      type: 'string',
      description: 'The card content'
    },
    className: {
      type: 'string',
      description: 'The card class'
    }
  },
}

export default meta

export const Primary: StoryObj<CardProps> = {
  args: {
    children: 'Card'
  }
}


