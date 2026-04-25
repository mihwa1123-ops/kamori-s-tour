import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'dark'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ===== Variants ===== */
export const Primary: Story = {
  args: { variant: 'primary', children: 'Begin the walk' },
};
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'See map' },
};
export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Read more' },
};
export const Dark: Story = {
  args: { variant: 'dark', children: 'View source' },
};

/* ===== Sizes ===== */
export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Small' },
};
export const Medium: Story = {
  args: { variant: 'primary', size: 'md', children: 'Medium' },
};
export const Large: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Large' },
};

/* ===== Comparison ===== */
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="dark">Dark</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/* ===== States ===== */
export const Loading: Story = {
  args: { variant: 'primary', children: 'Loading...', loading: true },
};
export const Disabled: Story = {
  args: { variant: 'primary', children: 'Disabled', disabled: true },
};
export const FullWidth: Story = {
  parameters: { layout: 'padded' },
  args: { variant: 'primary', children: 'Begin the walk', fullWidth: true },
};

/* ===== Multilingual (5 languages) ===== */
export const English: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Begin the walk' },
  globals: { locale: 'en' },
};
export const Japanese: Story = {
  args: { variant: 'primary', size: 'lg', children: '歩き始める' },
  globals: { locale: 'ja' },
};
export const Korean: Story = {
  args: { variant: 'primary', size: 'lg', children: '걷기 시작' },
  globals: { locale: 'ko' },
};
export const Spanish: Story = {
  args: { variant: 'primary', size: 'lg', children: 'Comenzar el paseo' },
  globals: { locale: 'es' },
};
export const Chinese: Story = {
  args: { variant: 'primary', size: 'lg', children: '开始漫步' },
  globals: { locale: 'zh' },
};
