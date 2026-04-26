import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpotDetailLayout } from './SpotDetailLayout';

const meta: Meta<typeof SpotDetailLayout> = {
  title: 'Templates/SpotDetailLayout',
  component: SpotDetailLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스팟 상세 페이지 전체 레이아웃. PC: 좌 65% 본문 + 우 35% sticky 사이드바. 모바일: 세로 스택 + Floating CTA. 히어로에만 BlobMask 1개, 갤러리는 일반 사각.',
      },
    },
  },
  argTypes: {
    locale: { control: 'radio', options: ['en', 'ja', 'ko', 'es', 'zh'] },
  },
  args: {
    spot: {
      id: 'soje-dong',
      name: 'Soje-dong',
      shape: 'heritage',
      walkTime: 5,
      isFree: true,
      badge: { label: 'heritage', color: '#A594F9' },
      description: '120년 된 철도 마을의 골목 사이에 카페와 공방이 자리 잡고 있어요.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpotDetailLayout>;

/* ===== 5개 언어 (Desktop) ===== */
export const English: Story = {
  args: { locale: 'en' },
  globals: { locale: 'en' },
};
export const Japanese: Story = {
  args: { locale: 'ja' },
  globals: { locale: 'ja' },
};
export const Korean: Story = {
  args: { locale: 'ko' },
  globals: { locale: 'ko' },
};
export const Spanish: Story = {
  args: { locale: 'es' },
  globals: { locale: 'es' },
};
export const Chinese: Story = {
  args: { locale: 'zh' },
  globals: { locale: 'zh' },
};

/* ===== 카테고리 변형 ===== */
export const MarketSpot: Story = {
  args: {
    locale: 'en',
    spot: {
      id: 'jungang',
      name: 'Jungang Market',
      shape: 'market',
      walkTime: 8,
      isFree: true,
      badge: { label: 'market', color: '#FFB3C6' },
    },
  },
  globals: { locale: 'en' },
};

export const NatureSpot: Story = {
  args: {
    locale: 'en',
    spot: {
      id: 'bomunsan',
      name: 'Bomunsan',
      shape: 'nature',
      walkTime: 20,
      isFree: true,
      badge: { label: 'nature', color: '#FFE663' },
    },
  },
  globals: { locale: 'en' },
};

/* ===== Mobile viewport ===== */
export const MobileEnglish: Story = {
  args: { locale: 'en' },
  globals: { locale: 'en' },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
export const MobileKorean: Story = {
  args: { locale: 'ko' },
  globals: { locale: 'ko' },
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

/* ===== Tablet ===== */
export const Tablet: Story = {
  args: { locale: 'en' },
  globals: { locale: 'en' },
  parameters: { viewport: { defaultViewport: 'tablet' } },
};
