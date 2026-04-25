import type { Spot } from '../components/organisms/SpotCard';

/* ============================================================
   Spot 데이터 (단일 출처)
   HomeLayout 의 Three Alleys 섹션 + SpotPage 디테일 화면 공유.
   ============================================================ */

export const SPOTS: Record<string, Spot> = {
  'soje-dong': {
    id: 'soje-dong',
    category: 'heritage',
    shape: 'heritage',
    name: 'Soje-dong',
    description: 'Railway village, now cafés.',
    walkTime: 5,
    imageSrc: 'https://placehold.co/600x600/A594F9/1A1A2E?text=Soje',
    imageAlt: '소제동 철도관사촌',
  },
  'jungang': {
    id: 'jungang',
    category: 'market',
    shape: 'market',
    name: 'Jungang Market',
    description: 'Since 1905, still loud.',
    walkTime: 8,
    imageSrc: 'https://placehold.co/600x600/FFB3C6/1A1A2E?text=Jungang',
    imageAlt: '중앙시장',
  },
  'bomunsan': {
    id: 'bomunsan',
    category: 'nature',
    shape: 'nature',
    name: 'Bomunsan',
    description: 'A pine forest downtown.',
    walkTime: 20,
    imageSrc: 'https://placehold.co/600x600/FFE663/1A1A2E?text=Bomunsan',
    imageAlt: '보문산',
  },
};

export const SPOT_LIST: Spot[] = Object.values(SPOTS);

export const SUPPORTED_LANGS = ['en', 'ja', 'ko', 'es', 'zh'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function isValidLang(value: string | undefined): value is SupportedLang {
  return !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);
}
