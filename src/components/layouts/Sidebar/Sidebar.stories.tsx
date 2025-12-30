import { Sidebar } from './Sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Sidebar> = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  args: {
    userName: '山田太郎',
  },
}
