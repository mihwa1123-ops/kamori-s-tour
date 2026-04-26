/* ============================================================
   Photo URL helper — Lorem Picsum (무료, API 키 불필요)
   각 스팟별로 결정적(deterministic) seed 를 사용해 항상 동일한
   이미지 세트를 받음. 추후 실제 사진 디렉토리로 교체 가능.
   ============================================================ */

const BASE = 'https://picsum.photos';

/** 스팟 1 장 — 카드용 가로 비율 (327x180 ≈ 16:9) */
export function spotCardPhoto(spotId: string, idx = 0, w = 600, h = 360): string {
  return `${BASE}/seed/${spotId}-${idx}/${w}/${h}`;
}

/** 스팟 히어로 캐러셀용 3장 (정사각에 가까운 비율) */
export function spotHeroPhotos(spotId: string, count = 3, size = 480): string[] {
  return Array.from({ length: count }, (_, i) => `${BASE}/seed/${spotId}-${i + 1}/${size}/${size}`);
}

/** 더미 설명문 — 카드 2줄용 */
export function dummyCaption(_spotId: string, theme?: string): string {
  const captions: Record<string, string> = {
    sight:   '도심 속 숨겨진 명소. 천천히 걸으면 보이는 작은 풍경들.',
    history: '시간이 켜켜이 쌓인 골목에서 만나는 이야기.',
    nature:  '계절마다 다른 얼굴로 반겨주는 자연 한 조각.',
    food:    '대를 이어 지켜온 한 그릇의 진심.',
  };
  return theme ? captions[theme] ?? captions.sight : captions.sight;
}
