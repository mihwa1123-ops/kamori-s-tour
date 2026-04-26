import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 라우트 변경 시 페이지 최상단으로 스크롤.
 * React Router 의 기본 동작은 이전 스크롤 위치를 유지하므로,
 * 상세 페이지(`/theme/:theme` 등)로 이동했을 때 사용자가 보던
 * 위치 그대로 보여 어색함 → 이 훅으로 항상 top 0 으로 리셋.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
