import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['heritage', 'market', 'food', 'story', 'alleys', 'nature', 'meta', 'accent'],
    },
    size: { control: 'radio', options: ['sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

/* ===== Category variants ===== */
export const Heritage: Story = { args: { variant: 'heritage', children: '● Heritage' } };
export const Market: Story = { args: { variant: 'market', children: '● Market' } };
export const Food: Story = { args: { variant: 'food', children: '● Food' } };
export const Story_: Story = {
  args: { variant: 'story', children: '● Story' },
  name: 'Story',
};
export const Alleys: Story = { args: { variant: 'alleys', children: '● Alleys' } };
export const Nature: Story = { args: { variant: 'nature', children: '● Nature' } };

/* ===== Utility variants ===== */
export const Meta_: Story = {
  args: { variant: 'meta', children: '5 min' },
  name: 'Meta',
};
export const Accent: Story = { args: { variant: 'accent', children: 'NEW' } };

/* ===== Comparison ===== */
export const AllCategories: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag variant="heritage">● Heritage</Tag>
      <Tag variant="market">● Market</Tag>
      <Tag variant="food">● Food</Tag>
      <Tag variant="story">● Story</Tag>
      <Tag variant="alleys">● Alleys</Tag>
      <Tag variant="nature">● Nature</Tag>
      <Tag variant="meta">FREE</Tag>
      <Tag variant="accent">NEW</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag variant="heritage" size="sm">● Heritage</Tag>
      <Tag variant="heritage" size="md">● Heritage</Tag>
    </div>
  ),
};
