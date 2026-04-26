/* ============================================================
   Attractions — 대전 중구 정부 공개 데이터 (djjunggu.go.kr)
   4개 테마: sight(관광) · history(역사) · nature(자연) · food(맛집)
   좌표: Nominatim 지오코딩 결과 (scripts/geocode-spots.mjs)
   ============================================================ */

export type Theme = 'sight' | 'history' | 'nature' | 'food';

export interface Attraction {
  id: string;
  theme: Theme;
  name: string;        // 영문 (로마자) 이름
  nameKo: string;      // 한글 이름
  address: string;
  description: string;
  lat: number;
  lng: number;
  /** 맛집의 경우 대표 메뉴/특징, 그 외엔 미사용 */
  menu?: string;
}

export const ATTRACTIONS: Attraction[] = [
  // ===== 관광 (sight) — 4개 =====
  { id: 'oworld',       theme: 'sight',  name: 'O!World',      nameKo: '대전 오월드',     address: '대전광역시 중구 사정공원로 70',         description: 'Theme park with zoo and rides.',         lat: 36.2893084, lng: 127.3980664 },
  { id: 'hyo-world',    theme: 'sight',  name: 'Hyo World',    nameKo: '효월드',          address: '대전광역시 중구 뿌리공원로 47',         description: 'Filial-piety culture park.',             lat: 36.2855465, lng: 127.3802237 },
  { id: 'ppuri-park',   theme: 'sight',  name: 'Ppuri Park',   nameKo: '뿌리공원',        address: '대전광역시 중구 뿌리공원로 47',         description: 'Family-roots themed park with monuments.', lat: 36.2860, lng: 127.3795 },
  { id: 'jokbo-museum', theme: 'sight',  name: 'Jokbo Museum', nameKo: '족보박물관',      address: '대전광역시 중구 뿌리공원로 79',         description: 'Korean genealogy museum.',               lat: 36.2868, lng: 127.3812 },

  // ===== 역사 (history) — 7개 =====
  { id: 'shin-chaeho',   theme: 'history', name: 'Shin Chae-ho House', nameKo: '단재 신채호 생가', address: '대전광역시 중구 단재로229번길 47',     description: 'Birthplace of independence activist.',   lat: 36.2321067, lng: 127.4103139 },
  { id: 'bomunsanseong', theme: 'history', name: 'Bomunsan Fortress',  nameKo: '보문산성',          address: '대전광역시 중구 보문산공원로 252-57',  description: 'Joseon-era mountain fortress.',         lat: 36.3160893, lng: 127.4249109 },
  { id: 'bomunsa-ji',    theme: 'history', name: 'Bomunsa Site',       nameKo: '보문사지',          address: '대전 중구 무수동 산2-1',               description: 'Buddhist temple ruins on Bomunsan.',     lat: 36.3022,    lng: 127.4350 },
  { id: 'yuhoedang',     theme: 'history', name: 'Yuhoedang',          nameKo: '유회당',            address: '대전광역시 중구 운남로85번길 32-18',   description: 'Andong Kwon clan traditional house.',    lat: 36.2791358, lng: 127.4074948 },
  { id: 'bongsoru',      theme: 'history', name: 'Bongsoru',           nameKo: '봉소루',            address: '대전광역시 중구 봉소루로 29',          description: 'Joseon-era pavilion.',                   lat: 36.3082483, lng: 127.4424514 },
  { id: 'yeogyeongam',   theme: 'history', name: 'Yeogyeongam',        nameKo: '여경암',            address: '대전광역시 중구 운남로85번길 54-153',  description: 'Historic Buddhist hermitage.',           lat: 36.2790972, lng: 127.4110618 },
  { id: 'changgye',      theme: 'history', name: 'Changgye Sungjeolsa', nameKo: '창계숭절사',       address: '대전광역시 중구 대둔산로137번길 67',   description: 'Confucian shrine.',                      lat: 36.2840514, lng: 127.3741899 },

  // ===== 자연 (nature) — 3개 =====
  { id: 'bomunsan',  theme: 'nature', name: 'Bomunsan',     nameKo: '보문산',     address: '대전광역시 중구 보문산공원로 446',    description: 'Pine-forest mountain in old town.',  lat: 36.3018,    lng: 127.4318 },
  { id: 'temi-park', theme: 'nature', name: 'Temi Park',    nameKo: '테미공원',   address: '대전광역시 중구 보문로199번길 37-36', description: 'Hilltop park with old colonial buildings.', lat: 36.3203088, lng: 127.4207842 },
  { id: 'sajeong',   theme: 'nature', name: 'Sajeong Park', nameKo: '사정공원',   address: '대전광역시 중구 사정공원로 160',      description: 'Forested park near O!World.',        lat: 36.2902319, lng: 127.3888031 },

  // ===== 맛집 (food) — 12개 (3대 30년 전통업소) =====
  { id: 'choryang',   theme: 'food', name: 'Choryang Sikdang',     nameKo: '초량식당',       address: '대전광역시 중구 중앙로121번길 58',    description: '3-generation 30-year traditional restaurant.', menu: 'Grilled pollock (황태구이)',  lat: 36.3292449, lng: 127.422557 },
  { id: 'yeona',      theme: 'food', name: 'Yeona Sikdang',         nameKo: '연아식당',       address: '대전광역시 중구 유천로 57-9',         description: '3-generation 30-year traditional restaurant.', menu: 'Pollock stew (황태찜·황태탕)', lat: 36.3132068, lng: 127.398492 },
  { id: 'yeongdong',  theme: 'food', name: 'Yeongdong Sikdang',     nameKo: '영동식당',       address: '대전광역시 중구 계룡로874번길 27-9',  description: '3-generation 30-year traditional restaurant.', menu: 'Spicy braised chicken (닭볶음탕)', lat: 36.3226022, lng: 127.4082226 },
  { id: 'gwangcheon', theme: 'food', name: 'Gwangcheon Sikdang',    nameKo: '광천식당',       address: '대전광역시 중구 대종로505번길 29',    description: '3-generation 30-year traditional restaurant.', menu: 'Tofu duruchigi · kalguksu',         lat: 36.328689,  lng: 127.4234387 },
  { id: 'jeong',      theme: 'food', name: 'Jeong Sikdang',         nameKo: '정식당',         address: '대전광역시 중구 중앙로130번길 37-13', description: '3-generation 30-year traditional restaurant.', menu: 'Spicy braised chicken (닭볶음탕)', lat: 36.3269721, lng: 127.4248399 },
  { id: 'geumgwang',  theme: 'food', name: 'Geumgwang Sikdang',     nameKo: '금광식당',       address: '대전광역시 중구 충무로 127',          description: '3-generation 30-year traditional restaurant.', menu: 'Hanjeongsik course (한정식)',       lat: 36.3193537, lng: 127.4316515 },
  { id: 'sariwon',    theme: 'food', name: 'Sariwon Myeonok',       nameKo: '사리원면옥',     address: '대전광역시 중구 중교로 62',           description: '3-generation 30-year traditional restaurant.', menu: 'Pyongyang-style cold noodles',      lat: 36.3258879, lng: 127.4253898 },
  { id: 'daedeulbo',  theme: 'food', name: 'Daedeulbo Hamheung',    nameKo: '대들보함흥면옥', address: '대전광역시 중구 계백로1583번길 39',   description: '3-generation 30-year traditional restaurant.', menu: 'Hamheung-style cold noodles',       lat: 36.3198762, lng: 127.3952562 },
  { id: 'hanyeong',   theme: 'food', name: 'Hanyeong Sikdang',      nameKo: '한영식당',       address: '대전광역시 중구 계룡로874번길 6',     description: '3-generation 30-year traditional restaurant.', menu: 'Spicy braised chicken (닭도리탕)', lat: 36.3221,    lng: 127.4078 },
  { id: 'haksun',     theme: 'food', name: 'Haksun Sikdang',        nameKo: '학선식당',       address: '대전광역시 중구 보문로 295-1',        description: '3-generation 30-year traditional restaurant.', menu: 'Kimchi stew (김치찌개)',            lat: 36.3148504, lng: 127.439318 },
  { id: 'jinro',      theme: 'food', name: 'Jinro-jip',             nameKo: '진로집',         address: '대전광역시 중구 중교로 45-5',         description: '3-generation 30-year traditional restaurant.', menu: 'Tofu duruchigi (두부두루치기)',     lat: 36.3277836, lng: 127.4292111 },
  { id: 'sonamu',     theme: 'food', name: 'Sonamu-jip',            nameKo: '소나무집',       address: '대전광역시 중구 대종로460번길 59',    description: '3-generation 30-year traditional restaurant.', menu: 'Squid kalguksu (오징어칼국수)',     lat: 36.3266218, lng: 127.4297118 },
];

export const ATTRACTIONS_BY_ID: Record<string, Attraction> = Object.fromEntries(
  ATTRACTIONS.map((a) => [a.id, a])
);

/** 테마별 메타데이터 (라벨 · 마커 색상 · 이모지) */
export const THEME_META: Record<Theme, { labelEn: string; labelKo: string; labelJa: string; labelEs: string; labelZh: string; emoji: string; color: string }> = {
  sight:   { labelEn: 'Sights',  labelKo: '관광', labelJa: '観光',   labelEs: 'Turismo', labelZh: '观光', emoji: '🎡', color: '#E63946' },
  history: { labelEn: 'History', labelKo: '역사', labelJa: '歴史',   labelEs: 'Historia', labelZh: '历史', emoji: '🏛',  color: '#8B5CF6' },
  nature:  { labelEn: 'Nature',  labelKo: '자연', labelJa: '自然',   labelEs: 'Naturaleza', labelZh: '自然', emoji: '🌿', color: '#22C55E' },
  food:    { labelEn: 'Food',    labelKo: '맛집', labelJa: 'グルメ', labelEs: 'Comida', labelZh: '美食', emoji: '🍴', color: '#F59E0B' },
};

/* ============================================================
   거리 계산 (Haversine) + 추천 유틸
   ============================================================ */
const EARTH_RADIUS_KM = 6371;

/** 두 좌표 간 직선 거리 (km) */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** 직선 거리 → 도보 시간 추정 (보행 속도 4.5km/h) */
export function walkMinutes(km: number): number {
  return Math.max(1, Math.round((km / 4.5) * 60));
}

/**
 * 선택된 스팟 주변에서 다른 테마(sight·history·nature)의 추천 스팟 N개 반환.
 * 정렬: 직선 거리 가까운 순.
 */
export function recommendNearby(
  origin: Attraction,
  options: { limit?: number; excludeThemes?: Theme[]; maxKm?: number } = {}
): Array<Attraction & { distanceKm: number; walkMin: number }> {
  const { limit = 5, excludeThemes = [origin.theme], maxKm = 5 } = options;
  return ATTRACTIONS
    .filter((a) => a.id !== origin.id && !excludeThemes.includes(a.theme))
    .map((a) => {
      const d = distanceKm(origin, a);
      return { ...a, distanceKm: d, walkMin: walkMinutes(d) };
    })
    .filter((a) => a.distanceKm <= maxKm)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

/** 지도 중심: 중구 원도심 + 보문산 일대를 모두 포괄 */
export const JUNGGU_CENTER = { lat: 36.310, lng: 127.420, zoom: 13 };
