import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeLayout } from './HomeLayout';

const meta: Meta<typeof HomeLayout> = {
  title: 'Templates/HomeLayout',
  component: HomeLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '홈 페이지 전체 레이아웃. KV Anti-Grid Hero + Three Alleys + Field Note + Route Preview + Footer + Floating CTA.',
      },
    },
  },
  argTypes: {
    locale: { control: 'radio', options: ['en', 'ja', 'ko', 'es', 'zh'] },
  },
};

export default meta;
type Story = StoryObj<typeof HomeLayout>;

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
