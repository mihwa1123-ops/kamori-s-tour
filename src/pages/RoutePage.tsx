import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Header } from '../components/organisms/Header';
import { BottomTabBar } from '../components/organisms/BottomTabBar';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { isValidLang, SPOTS } from '../data/spots';
import { loadSavedCourses, type SavedCourse } from '../components/organisms/CourseBuilder';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';
import './SimplePage.css';

const COPY: Record<string, {
  title: string;
  empty: string;
  emptyAction: string;
  walkUnit: string;
  stops: string;
  delete: string;
}> = {
  en: {
    title: 'Your saved routes',
    empty: 'No saved routes yet. Build a course on the home page.',
    emptyAction: 'Build a course',
    walkUnit: 'min',
    stops: 'stops',
    delete: 'Delete',
  },
  ja: {
    title: '保存したルート',
    empty: 'まだ保存したルートがありません。ホームでコースをつくりましょう。',
    emptyAction: 'コースをつくる',
    walkUnit: '分',
    stops: 'スポット',
    delete: '削除',
  },
  ko: {
    title: '저장된 루트',
    empty: '아직 저장된 루트가 없어요. 홈에서 코스를 만들어 보세요.',
    emptyAction: '코스 만들러 가기',
    walkUnit: '분',
    stops: '스팟',
    delete: '삭제',
  },
  es: {
    title: 'Tus rutas guardadas',
    empty: 'Aún no tienes rutas guardadas. Crea una en la página de inicio.',
    emptyAction: 'Crear una ruta',
    walkUnit: 'min',
    stops: 'paradas',
    delete: 'Eliminar',
  },
  zh: {
    title: '已保存的路线',
    empty: '还没有保存的路线。在首页创建一个吧。',
    emptyAction: '去创建路线',
    walkUnit: '分钟',
    stops: '站',
    delete: '删除',
  },
};

const STORAGE_KEY = 'kamori:saved-courses';

export default function RoutePage() {
  const { lang } = useParams();
  useSyncHtmlLang(lang);
  const [courses, setCourses] = useState<SavedCourse[]>([]);

  useEffect(() => {
    setCourses(loadSavedCourses());
  }, []);

  if (!isValidLang(lang)) {
    return <Navigate to="/en/route" replace />;
  }

  const t = COPY[lang];

  const removeCourse = (id: string) => {
    const next = courses.filter((c) => c.id !== id);
    setCourses(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  return (
    <div className="simple-page">
      <Header variant="solid" />
      <main className="simple-page__main">
        <div className="container">
          <h1 className="simple-page__title">{t.title}</h1>

          {courses.length === 0 ? (
            <div className="simple-page__empty">
              <p>{t.empty}</p>
              <Link to={`/${lang}`}>
                <Button variant="primary">{t.emptyAction}</Button>
              </Link>
            </div>
          ) : (
            <ul className="route-page__list">
              {courses.map((c) => {
                const total = c.spotIds
                  .map((id, i) => (i === 0 ? 0 : SPOTS[id]?.walkTime ?? 0))
                  .reduce((a, b) => a + b, 0);
                return (
                  <li key={c.id} className="route-page__course">
                    <div className="route-page__course-meta">
                      <span>🚶 {total} {t.walkUnit}</span>
                      <span>·</span>
                      <span>{c.spotIds.length} {t.stops}</span>
                    </div>
                    <ol className="route-page__spots">
                      {c.spotIds.map((id) => {
                        const spot = SPOTS[id];
                        if (!spot) return null;
                        return (
                          <li key={id}>
                            <Link to={`/${lang}/spot/${id}`}>
                              <Badge category={spot.category} size="sm" />
                              <span>{spot.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                    <button
                      type="button"
                      className="route-page__delete"
                      onClick={() => removeCourse(c.id)}
                    >
                      {t.delete}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
