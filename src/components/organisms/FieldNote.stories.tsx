import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldNote } from './FieldNote';

const meta: Meta<typeof FieldNote> = {
  title: 'Organisms/FieldNote',
  component: FieldNote,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { onCtaClick: { action: 'cta-clicked' } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FieldNote>;

const minJi = {
  initials: 'M',
  name: 'Min-ji',
  role: 'local guide, 3rd generation',
};

/* ===== 5개 언어 (CJK 이탤릭 해제 검증) ===== */

export const English: Story = {
  args: {
    quote:
      'If you miss the 7am light on the railway bricks, you miss half the point.',
    highlight: 'half the point',
    author: minJi,
    ctaLabel: 'Read full story',
  },
  globals: { locale: 'en' },
};

export const Japanese: Story = {
  args: {
    quote: '朝7時の鉄道レンガに光が差す瞬間を逃すと、半分は意味がない。',
    highlight: '半分は意味がない',
    author: { initials: 'み', name: 'みんじ', role: '地元ガイド · 3代目' },
    ctaLabel: '物語を読む',
  },
  globals: { locale: 'ja' },
};

export const Korean: Story = {
  args: {
    quote: '아침 7시 철도 벽돌에 비치는 빛을 놓치면, 절반은 놓치는 거예요.',
    highlight: '절반은 놓치는 거예요',
    author: { initials: '민', name: '민지', role: '동네 가이드 · 3대' },
    ctaLabel: '전체 이야기 읽기',
  },
  globals: { locale: 'ko' },
};

export const Spanish: Story = {
  args: {
    quote:
      'Si te pierdes la luz de las 7am sobre los ladrillos del ferrocarril, te pierdes la mitad.',
    highlight: 'la mitad',
    author: { initials: 'M', name: 'Min-ji', role: 'guía local, 3ra generación' },
    ctaLabel: 'Leer historia',
  },
  globals: { locale: 'es' },
};

export const Chinese: Story = {
  args: {
    quote: '如果错过了早上7点照在铁路砖墙上的光,就错过了一半的意义。',
    highlight: '一半的意义',
    author: { initials: '民', name: '民智', role: '本地向导 · 第三代' },
    ctaLabel: '阅读全文',
  },
  globals: { locale: 'zh' },
};

/* ===== 옵션 변형 ===== */

export const WithoutHighlight: Story = {
  args: {
    quote:
      'A quiet morning in the old town tells stories that loud guidebooks miss.',
    author: minJi,
    ctaLabel: 'Read more',
  },
};

export const WithoutCTA: Story = {
  args: {
    quote: 'Sometimes the best note is no note at all.',
    highlight: 'no note',
    author: minJi,
  },
};
