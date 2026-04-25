import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'radio', options: ['transparent', 'solid'] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: 280,
          paddingBottom: 200,
          background: 'var(--off-white)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Transparent: Story = { args: { variant: 'transparent' } };
export const Solid: Story = { args: { variant: 'solid' } };

export const AllVariants: Story = {
  decorators: [],
  render: () => (
    <div style={{ background: 'var(--off-white)', minHeight: 400 }}>
      <Header variant="transparent" />
      <div
        style={{
          padding: 20,
          color: 'var(--slate)',
          fontSize: 12,
          fontStyle: 'italic',
        }}
      >
        ↑ transparent (스크롤 전)
      </div>
      <Header variant="solid" />
      <div
        style={{
          padding: 20,
          color: 'var(--slate)',
          fontSize: 12,
          fontStyle: 'italic',
        }}
      >
        ↑ solid (스크롤 후)
      </div>
    </div>
  ),
};

export const Mobile: Story = {
  args: { variant: 'solid' },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
