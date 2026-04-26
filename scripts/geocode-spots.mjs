#!/usr/bin/env node
// Daejeon Junggu 스팟 주소 → lat/lng 일괄 지오코딩 (Nominatim, 무료)
// 사용법: node scripts/geocode-spots.mjs > src/data/spots-geocoded.json
import { setTimeout as sleep } from 'node:timers/promises';

const SPOTS = [
  // ===== 관광 (sight) =====
  { id: 'oworld',       theme: 'sight',  name: 'O!World',        nameKo: '대전 오월드',         address: '대전광역시 중구 사정공원로 70',         desc: 'Theme park with zoo and rides.' },
  { id: 'hyo-world',    theme: 'sight',  name: 'Hyo World',      nameKo: '효월드',              address: '대전광역시 중구 뿌리공원로 47',         desc: 'Filial-piety culture park.' },
  { id: 'ppuri-park',   theme: 'sight',  name: 'Ppuri Park',     nameKo: '뿌리공원',            address: '대전광역시 중구 뿌리공원로 47',         desc: 'Family-roots themed park with monuments.' },
  { id: 'jokbo-museum', theme: 'sight',  name: 'Jokbo Museum',   nameKo: '족보박물관',          address: '대전광역시 중구 뿌리공원로 79',         desc: 'Korean genealogy museum.' },

  // ===== 역사 (history) =====
  { id: 'shin-chaeho',     theme: 'history', name: 'Shin Chae-ho House',      nameKo: '단재 신채호 생가',      address: '대전광역시 중구 단재로229번길 47', desc: 'Birthplace of independence activist.' },
  { id: 'bomunsanseong',   theme: 'history', name: 'Bomunsan Fortress',       nameKo: '보문산성',              address: '대전광역시 중구 보문산공원로 252-57', desc: 'Joseon-era mountain fortress.' },
  { id: 'bomunsa-ji',      theme: 'history', name: 'Bomunsa Temple Site',     nameKo: '보문사지',              address: '대전 중구 무수동 산2-1',            desc: 'Buddhist temple ruins.' },
  { id: 'yuhoedang',       theme: 'history', name: 'Yuhoedang',                nameKo: '유회당',                address: '대전광역시 중구 운남로85번길 32-18', desc: 'Andong Kwon clan traditional house.' },
  { id: 'bongsoru',        theme: 'history', name: 'Bongsoru',                 nameKo: '봉소루',                address: '대전광역시 중구 봉소루로 29',        desc: 'Joseon-era pavilion.' },
  { id: 'yeogyeongam',     theme: 'history', name: 'Yeogyeongam',              nameKo: '여경암',                address: '대전광역시 중구 운남로85번길 54-153', desc: 'Historic Buddhist hermitage.' },
  { id: 'changgye',        theme: 'history', name: 'Changgye Sungjeolsa',     nameKo: '창계숭절사',            address: '대전광역시 중구 대둔산로137번길 67', desc: 'Confucian shrine.' },

  // ===== 자연 (nature) =====
  { id: 'bomunsan',  theme: 'nature', name: 'Bomunsan',     nameKo: '보문산',     address: '대전광역시 중구 보문산공원로 446',      desc: 'Pine-forest mountain in old town.' },
  { id: 'temi-park', theme: 'nature', name: 'Temi Park',    nameKo: '테미공원',   address: '대전광역시 중구 보문로199번길 37-36',   desc: 'Hilltop park with old colonial buildings.' },
  { id: 'sajeong',   theme: 'nature', name: 'Sajeong Park', nameKo: '사정공원',   address: '대전광역시 중구 사정공원로 160',        desc: 'Forested park near O!World.' },

  // ===== 맛집 (food) — 3대 30년 전통업소 =====
  { id: 'choryang',     theme: 'food', name: 'Choryang Sikdang',         nameKo: '초량식당',         address: '대전광역시 중구 중앙로121번길 58',     desc: 'Grilled pollock (황태구이).' },
  { id: 'yeona',        theme: 'food', name: 'Yeona Sikdang',            nameKo: '연아식당',         address: '대전광역시 중구 유천로 57-9',          desc: 'Pollock stew (황태찜·황태탕).' },
  { id: 'yeongdong',    theme: 'food', name: 'Yeongdong Sikdang',        nameKo: '영동식당',         address: '대전광역시 중구 계룡로874번길 27-9',   desc: 'Spicy braised chicken (닭볶음탕).' },
  { id: 'gwangcheon',   theme: 'food', name: 'Gwangcheon Sikdang',       nameKo: '광천식당',         address: '대전광역시 중구 대종로505번길 29',     desc: 'Tofu duruchigi & kalguksu.' },
  { id: 'jeong',        theme: 'food', name: 'Jeong Sikdang',            nameKo: '정식당',           address: '대전광역시 중구 중앙로130번길 37-13',  desc: 'Spicy braised chicken (닭볶음탕).' },
  { id: 'geumgwang',    theme: 'food', name: 'Geumgwang Sikdang',        nameKo: '금광식당',         address: '대전광역시 중구 충무로 127',           desc: 'Hanjeongsik Korean royal-style course.' },
  { id: 'sariwon',      theme: 'food', name: 'Sariwon Myeonok',          nameKo: '사리원면옥',       address: '대전광역시 중구 중교로 62',            desc: 'Pyongyang-style cold noodles.' },
  { id: 'daedeulbo',    theme: 'food', name: 'Daedeulbo Hamheung',       nameKo: '대들보함흥면옥',   address: '대전광역시 중구 계백로1583번길 39',    desc: 'Hamheung-style cold noodles.' },
  { id: 'hanyeong',     theme: 'food', name: 'Hanyeong Sikdang',         nameKo: '한영식당',         address: '대전광역시 중구 계룡로874번길 6',      desc: 'Spicy braised chicken (닭도리탕).' },
  { id: 'haksun',       theme: 'food', name: 'Haksun Sikdang',           nameKo: '학선식당',         address: '대전광역시 중구 보문로 295-1',         desc: 'Kimchi stew (김치찌개).' },
  { id: 'jinro',        theme: 'food', name: 'Jinro-jip',                nameKo: '진로집',           address: '대전광역시 중구 중교로 45-5',          desc: 'Tofu duruchigi (두부두루치기).' },
  { id: 'sonamu',       theme: 'food', name: 'Sonamu-jip',               nameKo: '소나무집',         address: '대전광역시 중구 대종로460번길 59',     desc: 'Squid kalguksu (오징어칼국수).' },
];

async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1&countrycodes=kr`;
  const res = await fetch(url, { headers: { 'User-Agent': 'kamori-connect-tour/1.0 (mihwa1123@gmail.com)' } });
  if (!res.ok) throw new Error(`Nominatim ${res.status} for ${address}`);
  const json = await res.json();
  if (!json.length) return null;
  return { lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon), display: json[0].display_name };
}

const out = [];
for (const spot of SPOTS) {
  let result = null;
  try {
    result = await geocode(spot.address);
  } catch (e) {
    process.stderr.write(`ERROR ${spot.id}: ${e.message}\n`);
  }
  if (!result) {
    // fallback: try simplified address (just road + number)
    const simplified = spot.address.replace(/^대전(광역시)?\s*중구\s*/, '대전 중구 ');
    try {
      result = await geocode(simplified);
    } catch {}
  }
  out.push({
    ...spot,
    lat: result?.lat ?? null,
    lng: result?.lng ?? null,
    geocoded: result?.display ?? null,
  });
  process.stderr.write(`${result ? 'OK ' : 'MISS '} ${spot.id} ${spot.nameKo} → ${result ? `${result.lat},${result.lng}` : 'no result'}\n`);
  await sleep(1100); // Nominatim rate limit: 1 req/sec
}

console.log(JSON.stringify(out, null, 2));
