import type { Meta, StoryObj } from '@storybook/react-vite';
import { RouteTimeline, type RouteSpot } from './RouteTimeline';

const sixSpots: RouteSpot[] = [
  { id: 'soje', number: 1, name: 'Soje-dong', category: 'heritage' },
  {
    id: 'jungang',
    number: 2,
    name: 'Jungang Market',
    category: 'market',
    walkTimeFromPrev: 5,
    isCurrent: true,
  },
  {
    id: 'pungmi',
    number: 3,
    name: 'Pungmi Pavilion',
    category: 'story',
    walkTimeFromPrev: 8,
  },
  {
    id: 'kalguksu',
    number: 4,
    name: 'Kalguksu Alley',
    category: 'food',
    walkTimeFromPrev: 4,
  },
  {
    id: 'eunhaeng',
    number: 5,
    name: 'Eunhaeng Alley',
    category: 'alleys',
    walkTimeFromPrev: 6,
  },
  {
    id: 'bomunsan',
    number: 6,
    name: 'Bomunsan',
    category: 'nature',
    walkTimeFromPrev: 12,
  },
];

const meta: Meta<typeof RouteTimeline> = {
  title: 'Organisms/RouteTimeline',
  component: RouteTimeline,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['horizontal', 'vertical'] },
    onSpotClick: { action: 'spot-clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof RouteTimeline>;

export const Horizontal: Story = {
  args: { spots: sixSpots, variant: 'horizontal' },
};

export const Vertical: Story = {
  args: { spots: sixSpots, variant: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export const NoCurrent: Story = {
  args: {
    spots: sixSpots.map((s) => ({ ...s, isCurrent: false })),
    variant: 'horizontal',
  },
};
