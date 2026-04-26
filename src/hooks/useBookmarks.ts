import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'kamori:bookmarks';

function load(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function persist(set: Set<string>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
}

/**
 * 북마크 (스팟 저장) 관리 훅. 로컬 스토리지에 ID 만 보관.
 * 같은 키를 사용하는 모든 인스턴스가 'kamori:bookmarks-changed' 이벤트로 동기화.
 */
export function useBookmarks() {
  const [ids, setIds] = useState<Set<string>>(() => load());

  useEffect(() => {
    const onSync = () => setIds(load());
    window.addEventListener('kamori:bookmarks-changed', onSync);
    window.addEventListener('storage', onSync);
    return () => {
      window.removeEventListener('kamori:bookmarks-changed', onSync);
      window.removeEventListener('storage', onSync);
    };
  }, []);

  const has = useCallback((id: string) => ids.has(id), [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      persist(next);
      window.dispatchEvent(new Event('kamori:bookmarks-changed'));
      return next;
    });
  }, []);

  return { ids, has, toggle };
}
