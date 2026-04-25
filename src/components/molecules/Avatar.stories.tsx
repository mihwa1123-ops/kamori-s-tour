import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Molecules/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'radio', options: ['pink', 'lavender', 'yellow'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const InitialsPink: Story = {
  args: { initials: 'M', variant: 'pink' },
  name: 'Initials · Pink',
};
export const InitialsLavender: Story = {
  args: { initials: 'J', variant: 'lavender' },
  name: 'Initials · Lavender',
};
export const InitialsYellow: Story = {
  args: { initials: 'A', variant: 'yellow' },
  name: 'Initials · Yellow',
};

export const Image_: Story = {
  args: {
    src: 'https://placehold.co/96x96/A594F9/1A1A2E?text=M',
    alt: 'Min-ji',
  },
  name: 'Image',
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar initials="M" variant="pink" />
      <Avatar initials="J" variant="lavender" />
      <Avatar initials="A" variant="yellow" />
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar initials="M" size="sm" />
      <Avatar initials="M" size="md" />
      <Avatar initials="M" size="lg" />
    </div>
  ),
};
