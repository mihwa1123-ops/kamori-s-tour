import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSwitcher } from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Molecules/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    defaultLang: {
      control: 'radio',
      options: ['en', 'ja', 'ko', 'es', 'zh'],
    },
    onChange: { action: 'language-changed' },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 280, paddingTop: 16 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const English: Story = { args: { defaultLang: 'en' } };
export const Japanese: Story = { args: { defaultLang: 'ja' } };
export const Korean: Story = { args: { defaultLang: 'ko' } };
export const Spanish: Story = { args: { defaultLang: 'es' } };
export const Chinese: Story = { args: { defaultLang: 'zh' } };

export const InHeader: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [],
  render: () => (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: 'var(--white)',
        borderBottom: '0.5px solid var(--color-border-subtle)',
        minHeight: 320,
      }}
    >
      <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500 }}>
        daejeon/slow
      </span>
      <LanguageSwitcher defaultLang="en" />
    </header>
  ),
};
