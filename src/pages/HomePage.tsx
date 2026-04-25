import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { HomeLayout } from '../components/templates/HomeLayout';
import { isValidLang } from '../data/spots';
import { useSyncHtmlLang } from '../hooks/useSyncHtmlLang';

export default function HomePage() {
  const { lang } = useParams();
  const navigate = useNavigate();
  useSyncHtmlLang(lang);

  if (!isValidLang(lang)) {
    return <Navigate to="/en" replace />;
  }

  const handleSpotClick = (spotId: string) => {
    navigate(`/${lang}/spot/${spotId}`);
  };

  return <HomeLayout locale={lang} onSpotClick={handleSpotClick} />;
}
