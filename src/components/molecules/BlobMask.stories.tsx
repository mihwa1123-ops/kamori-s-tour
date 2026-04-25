import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlobMask } from './BlobMask';

const meta: Meta<typeof BlobMask> = {
  title: 'Molecules/BlobMask',
  component: BlobMask,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '카테고리별 유기적 블롭 마스크. 디자인 시스템의 시각 시그니처. layout-system.md §2 참조.',
      },
    },
  },
  argTypes: {
    shape: { control: 'radio', options: ['heritage', 'market', 'nature'] },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280, height: 280 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BlobMask>;

/* ===== 개별 쉐이프 (placehold.co 더미 이미지) ===== */
export const Heritage: Story = {
  args: {
    shape: 'heritage',
    src: 'https://placehold.co/600x600/A594F9/1A1A2E?text=Soje-dong',
    alt: '소제동 철도관사촌의 붉은 벽돌 골목',
  },
};

export const Market: Story = {
  args: {
    shape: 'market',
    src: 'https://placehold.co/600x600/FFB3C6/1A1A2E?text=Jungang',
    alt: '중앙시장 좌판 풍경',
  },
};

export const Nature: Story = {
  args: {
    shape: 'nature',
    src: 'https://placehold.co/600x600/FFE663/1A1A2E?text=Bomunsan',
    alt: '보문산 능선의 소나무 숲',
  },
};

/* ===== Placeholder Only — 이미지 없을 때 카테고리 컬러 확인 ===== */
export const PlaceholderHeritage: Story = {
  args: {
    shape: 'heritage',
    alt: 'Heritage 카테고리 placeholder (lavender 100)',
  },
  name: 'Placeholder · Heritage',
};

export const PlaceholderMarket: Story = {
  args: {
    shape: 'market',
    alt: 'Market 카테고리 placeholder (pink 100)',
  },
  name: 'Placeholder · Market',
};

export const PlaceholderNature: Story = {
  args: {
    shape: 'nature',
    alt: 'Nature 카테고리 placeholder (yellow 100)',
  },
  name: 'Placeholder · Nature',
};

/* ===== AllShapes — 같은 페이지 3개, ID 충돌 검증 ===== */
export const AllShapes: Story = {
  parameters: { layout: 'padded' },
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        maxWidth: 900,
      }}
    >
      <div>
        <BlobMask
          shape="heritage"
          src="https://placehold.co/600x600/A594F9/1A1A2E?text=H"
          alt="Heritage"
        />
        <p
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--slate)',
          }}
        >
          Heritage · rotate(−2°)
        </p>
      </div>
      <div>
        <BlobMask
          shape="market"
          src="https://placehold.co/600x600/FFB3C6/1A1A2E?text=M"
          alt="Market"
        />
        <p
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--slate)',
          }}
        >
          Market · rotate(1.5°)
        </p>
      </div>
      <div>
        <BlobMask
          shape="nature"
          src="https://placehold.co/600x600/FFE663/1A1A2E?text=K"
          alt="Nature"
        />
        <p
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 12,
            letterSpacing: 1,
            textTransform: 'uppercase',
            color: 'var(--slate)',
          }}
        >
          Nature · rotate(−1°)
        </p>
      </div>
    </div>
  ),
};

/* ===== ID 충돌 스트레스 — 같은 shape 6개 ===== */
export const SameShapeMultiple: Story = {
  parameters: { layout: 'padded' },
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        maxWidth: 600,
      }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <BlobMask
          key={i}
          shape="heritage"
          src={`https://placehold.co/400x400/A594F9/1A1A2E?text=${i + 1}`}
          alt={`Heritage 인스턴스 ${i + 1}`}
        />
      ))}
    </div>
  ),
};

/* ===== 홈 페이지 Three Alleys 시뮬레이션 ===== */
export const ThreeAlleysSimulation: Story = {
  parameters: { layout: 'padded' },
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        maxWidth: 1100,
      }}
    >
      <article>
        <BlobMask
          shape="heritage"
          src="https://placehold.co/600x600/A594F9/1A1A2E?text=Soje"
          alt="소제동 철도관사촌"
        />
        <h3
          style={{
            marginTop: 16,
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
          }}
        >
          Soje-dong
        </h3>
        <p style={{ color: 'var(--slate)', fontSize: 13, lineHeight: 1.65 }}>
          Railway village, now cafés.
        </p>
      </article>
      <article>
        <BlobMask
          shape="market"
          src="https://placehold.co/600x600/FFB3C6/1A1A2E?text=Jungang"
          alt="중앙시장"
        />
        <h3
          style={{
            marginTop: 16,
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
          }}
        >
          Jungang Market
        </h3>
        <p style={{ color: 'var(--slate)', fontSize: 13, lineHeight: 1.65 }}>
          Since 1905, still loud.
        </p>
      </article>
      <article>
        <BlobMask
          shape="nature"
          src="https://placehold.co/600x600/FFE663/1A1A2E?text=Bomunsan"
          alt="보문산"
        />
        <h3
          style={{
            marginTop: 16,
            fontFamily: 'var(--font-serif)',
            fontSize: 22,
          }}
        >
          Bomunsan
        </h3>
        <p style={{ color: 'var(--slate)', fontSize: 13, lineHeight: 1.65 }}>
          A pine forest downtown.
        </p>
      </article>
    </div>
  ),
};
