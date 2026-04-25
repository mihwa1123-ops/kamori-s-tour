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
      name: 'Jungang Market',
      category: 'market',
      shape: 'market',
      imageSrc: 'https://placehold.co/800x800/FFB3C6/1A1A2E?text=Jungang',
      imageAlt: '중앙시장',
    },
  },
  globals: { locale: 'en' },
};

export const NatureSpot: Story = {
  args: {
    locale: 'en',
    spot: {
      name: 'Bomunsan',
      category: 'nature',
      shape: 'nature',
      imageSrc: 'https://placehold.co/800x800/FFE663/1A1A2E?text=Bomunsan',
      imageAlt: '보문산',
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
