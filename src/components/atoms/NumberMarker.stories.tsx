import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberMarker } from './NumberMarker';

const meta: Meta<typeof NumberMarker> = {
  title: 'Atoms/NumberMarker',
  component: NumberMarker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    number: { control: 'text' },
    variant: { control: 'radio', options: ['lavender', 'pink', 'yellow', 'dark'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof NumberMarker>;

export const Lavender: Story = { args: { number: '01', variant: 'lavender' } };
export const Pink: Story = { args: { number: '02', variant: 'pink' } };
export const Yellow: Story = { args: { number: '03', variant: 'yellow' } };
export const Dark: Story = { args: { number: '04', variant: 'dark' } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <NumberMarker number="01" variant="lavender" />
      <NumberMarker number="02" variant="pink" />
      <NumberMarker number="03" variant="yellow" />
      <NumberMarker number="04" variant="dark" />
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <NumberMarker number="01" size="sm" />
      <NumberMarker number="01" size="md" />
      <NumberMarker number="01" size="lg" />
    </div>
  ),
};

export const RouteSequence: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {Array.from({ length: 6 }, (_, i) => String(i + 1).padStart(2, '0')).map((n) => (
        <NumberMarker key={n} number={n} variant="lavender" />
      ))}
    </div>
  ),
};
