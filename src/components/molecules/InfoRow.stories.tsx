import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoRow } from './InfoRow';

const PinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const meta: Meta<typeof InfoRow> = {
  title: 'Molecules/InfoRow',
  component: InfoRow,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InfoRow>;

export const Default: Story = {
  args: { icon: <PinIcon />, label: 'Address', value: '대전 동구 대동' },
};

export const NoIcon: Story = {
  args: { label: 'Hours', value: '9am – 6pm' },
};

export const SidebarStack: Story = {
  decorators: [],
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <InfoRow icon={<PinIcon />} label="Address" value="대전 동구 대동" />
      <InfoRow icon={<ClockIcon />} label="Hours" value="9am – 6pm" />
      <InfoRow label="Fee" value="FREE" />
      <InfoRow label="Walk time" value="5 min from 대전역" />
    </div>
  ),
};
