import { fn } from 'storybook/test'

import { Sidebar } from './Sidebar'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { DEFAULT_SIDEBAR_ITEMS } from '@/constants/navigation'

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
    items: DEFAULT_SIDEBAR_ITEMS,
    activeKey: null,
  },
}

export const ActiveItem: Story = {
  args: {
    userName: '山田太郎',
    items: DEFAULT_SIDEBAR_ITEMS,
    activeKey: 'transactions',
  },
}

export const CustomItems: Story = {
  args: {
    userName: '鈴木花子',
    items: DEFAULT_SIDEBAR_ITEMS.filter((item) => item.key !== 'analytics'),
    activeKey: 'dashboard',
    avatarUrl: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Hanako',
  },
}

export const LongUserName: Story = {
  args: {
    userName: 'とても長い表示名を持つユーザーサンプル',
    items: DEFAULT_SIDEBAR_ITEMS,
    activeKey: 'master',
  },
}

export const OnSelectAction: Story = {
  args: {
    userName: '選択イベント確認ユーザー',
    items: DEFAULT_SIDEBAR_ITEMS,
    activeKey: 'dashboard',
    onSelect: fn(),
  },
}
