import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotCard, type Spot } from './SpotCard';

const sojeDong: Spot = {
  id: 'soje-dong',
  category: 'heritage',
  shape: 'heritage',
  name: 'Soje-dong',
  description: 'Railway village, now cafés.',
  walkTime: 5,
  imageSrc: 'https://placehold.co/600x600/A594F9/1A1A2E?text=Soje',
  imageAlt: '소제동 철도관사촌',
};

const jungang: Spot = {
  id: 'jungang',
  category: 'market',
  shape: 'market',
  name: 'Jungang Market',
  description: 'Since 1905, still loud.',
  walkTime: 8,
  imageSrc: 'https://placehold.co/600x600/FFB3C6/1A1A2E?text=Jungang',
  imageAlt: '중앙시장',
};

const bomunsan: Spot = {
  id: 'bomunsan',
  category: 'nature',
  shape: 'nature',
  name: 'Bomunsan',
  description: 'A pine forest downtown.',
  walkTime: 20,
  imageSrc: 'https://placehold.co/600x600/FFE663/1A1A2E?text=Bomunsan',
  imageAlt: '보문산',
};

const meta: Meta<typeof SpotCard> = {
  title: 'Organisms/SpotCard',
  component: SpotCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact'] },
    onClick: { action: 'spot-clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SpotCard>;

export const HeritageSpot: Story = {
  args: { spot: sojeDong },
  name: 'Heritage · Soje-dong',
};

export const MarketSpot: Story = {
  args: { spot: jungang },
  name: 'Market · Jungang',
};

export const NatureSpot: Story = {
  args: { spot: bomunsan },
  name: 'Nature · Bomunsan',
};

export const Compact: Story = {
  args: { spot: sojeDong, variant: 'compact' },
};

/* ⭐ ThreeAlleysSection — 홈 페이지 시그니처 섹션 시뮬레이션 */
export const ThreeAlleysSection: Story = {
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        maxWidth: 1100,
      }}
    >
      <SpotCard spot={sojeDong} onClick={() => {}} />
      <SpotCard spot={jungang} onClick={() => {}} />
      <SpotCard spot={bomunsan} onClick={() => {}} />
    </div>
  ),
};

/* 모바일 1컬럼 세로 스택 */
export const MobileStack: Story = {
  decorators: [],
  parameters: {
    layout: 'padded',
    viewport: { defaultViewport: 'mobile' },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SpotCard spot={sojeDong} />
      <SpotCard spot={jungang} />
      <SpotCard spot={bomunsan} />
    </div>
  ),
};

/* Compact 가로 레이아웃 (모바일 사이드 리스트) */
export const CompactList: Story = {
  decorators: [],
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 480,
      }}
    >
      <SpotCard spot={sojeDong} variant="compact" />
      <SpotCard spot={jungang} variant="compact" />
      <SpotCard spot={bomunsan} variant="compact" />
    </div>
  ),
};
