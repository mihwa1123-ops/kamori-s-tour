import { useParams, Navigate } from 'react-router-dom';
import { HomeLayout } from '../components/templates/HomeLayout';
import { isValidLang } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';

export default function HomePage() {
  const { lang } = useParams();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  return <HomeLayout locale={lang} />;
}
