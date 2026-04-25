import { useEffect } from 'react';
import { isValidLang, type SupportedLang } from '../data/spots';

/**
 * URL 의 lang 파라미터를 <html lang> 속성에 동기화.
 * - en/ja/ko/es 는 그대로
 * - zh 는 zh-CN 으로 매핑 (font-system 명세)
 * - 잘못된 lang 은 무시 (HomePage/SpotPage 의 isValidLang 가드가 이미 처리)
 *
 * 페이지 컴포넌트(HomePage, SpotPage)에서 호출하면, 직접 URL 진입
 * (예: 사용자가 /ko/spot/jungang 을 북마크) 시에도 폰트 자동 분기 보장.
 */
export function useSyncHtmlLang(lang: string | undefined) {
  useEffect(() => {
    if (!isValidLang(lang)) return;
    const htmlLang: SupportedLang | 'zh-CN' = lang === 'zh' ? 'zh-CN' : lang;
    document.documentElement.lang = htmlLang;
  }, [lang]);
}
