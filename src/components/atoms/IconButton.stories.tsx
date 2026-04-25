import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'subtle'] },
    size: { control: 'radio', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: { icon: <CloseIcon />, label: 'Close' },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = { args: { variant: 'default' } };
export const Subtle: Story = { args: { variant: 'subtle' } };

export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon={<CloseIcon />} label="Close" variant="default" />
      <IconButton icon={<CloseIcon />} label="Close" variant="subtle" />
      <IconButton icon={<MenuIcon />} label="Menu" variant="default" />
      <IconButton icon={<MenuIcon />} label="Menu" variant="subtle" />
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton icon={<CloseIcon />} label="Close" size="sm" />
      <IconButton icon={<CloseIcon />} label="Close" size="md" />
    </div>
  ),
};
