import type { Preview } from '@storybook/react'

import '../src/app/globals.css'

import React from 'react'
import { ThemeProvider } from '../src/lib/theme/theme-provider'

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [{ name: 'Light', value: '#f4f4f5' }],
      default: 'Light'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
]

export default preview
