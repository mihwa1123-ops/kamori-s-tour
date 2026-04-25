import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Organisms/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile' },
    docs: {
      description: {
        component:
          '모바일 전용 드래그 가능한 하단 시트. PC viewport (1024px+) 에서는 자동 숨김.',
      },
    },
  },
  argTypes: {
    defaultHeight: {
      control: 'radio',
      options: ['collapsed', 'expanded'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

const sampleContent = (
  <div>
    <h3
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 18,
        marginBottom: 12,
      }}
    >
      Selected Spot
    </h3>
    <p style={{ color: 'var(--slate)', fontSize: 13, lineHeight: 1.6 }}>
      Soje-dong railway village. Tap a marker on the map to see details.
    </p>
    <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
      <li
        style={{
          padding: '12px 0',
          borderBottom: '0.5px solid var(--color-border-subtle)',
        }}
      >
        📍 대전 동구 대동
      </li>
      <li
        style={{
          padding: '12px 0',
          borderBottom: '0.5px solid var(--color-border-subtle)',
        }}
      >
        🕐 9am – 6pm
      </li>
      <li style={{ padding: '12px 0' }}>🚶 5 min from 대전역</li>
    </ul>
  </div>
);

export const Collapsed: Story = {
  args: { defaultHeight: 'collapsed', children: sampleContent },
};

export const Expanded: Story = {
  args: { defaultHeight: 'expanded', children: sampleContent },
};

export const DesktopHidden: Story = {
  args: { defaultHeight: 'collapsed', children: sampleContent },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
    docs: {
      description: {
        story: 'PC viewport 에서는 `display: none` 으로 자동 숨김.',
      },
    },
  },
};
