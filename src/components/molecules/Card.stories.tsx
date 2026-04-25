import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'radio', options: ['default', 'tinted', 'dark'] },
    tint: { control: 'radio', options: ['lavender', 'pink', 'yellow'] },
    padding: { control: 'radio', options: ['sm', 'md', 'lg'] },
    hoverable: { control: 'boolean' },
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
type Story = StoryObj<typeof Card>;

const sampleContent = (
  <>
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 8 }}>
      Soje-dong
    </h3>
    <p style={{ color: 'var(--slate)', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
      Railway village, now cafés.
    </p>
  </>
);

const darkContent = (
  <>
    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 8 }}>
      The Field Note
    </h3>
    <p
      style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        lineHeight: 1.65,
        margin: 0,
      }}
    >
      A quote from the local guide.
    </p>
  </>
);

/* ===== Variants ===== */
export const Default: Story = {
  args: { variant: 'default', children: sampleContent },
};

export const TintedLavender: Story = {
  args: { variant: 'tinted', tint: 'lavender', children: sampleContent },
  name: 'Tinted · Lavender',
};

export const TintedPink: Story = {
  args: { variant: 'tinted', tint: 'pink', children: sampleContent },
  name: 'Tinted · Pink',
};

export const TintedYellow: Story = {
  args: { variant: 'tinted', tint: 'yellow', children: sampleContent },
  name: 'Tinted · Yellow',
};

export const Dark: Story = {
  args: { variant: 'dark', children: darkContent },
};

export const Hoverable: Story = {
  args: { variant: 'default', hoverable: true, children: sampleContent },
};

/* ===== Comparison ===== */
export const AllVariants: Story = {
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        maxWidth: 1000,
      }}
    >
      <Card variant="default">{sampleContent}</Card>
      <Card variant="tinted" tint="lavender">{sampleContent}</Card>
      <Card variant="dark">{darkContent}</Card>
    </div>
  ),
};

export const AllTints: Story = {
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        maxWidth: 900,
      }}
    >
      <Card variant="tinted" tint="lavender">{sampleContent}</Card>
      <Card variant="tinted" tint="pink">{sampleContent}</Card>
      <Card variant="tinted" tint="yellow">{sampleContent}</Card>
    </div>
  ),
};

export const AllPaddings: Story = {
  decorators: [],
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16,
        maxWidth: 900,
      }}
    >
      <Card padding="sm">{sampleContent}</Card>
      <Card padding="md">{sampleContent}</Card>
      <Card padding="lg">{sampleContent}</Card>
    </div>
  ),
};
