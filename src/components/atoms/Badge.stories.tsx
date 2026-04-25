import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    category: {
      control: 'select',
      options: ['heritage', 'market', 'food', 'story', 'alleys', 'nature'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Heritage: Story = { args: { category: 'heritage' } };
export const Market: Story = { args: { category: 'market' } };
export const Food: Story = { args: { category: 'food' } };
export const Story_: Story = {
  args: { category: 'story' },
  name: 'Story',
};
export const Alleys: Story = { args: { category: 'alleys' } };
export const Nature: Story = { args: { category: 'nature' } };

export const AllCategories: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      {(['heritage', 'market', 'food', 'story', 'alleys', 'nature'] as const).map((cat) => (
        <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge category={cat} />
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--slate)' }}>
            {cat}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Badge category="heritage" size="sm" />
      <Badge category="heritage" size="md" />
      <Badge category="heritage" size="lg" />
    </div>
  ),
};
