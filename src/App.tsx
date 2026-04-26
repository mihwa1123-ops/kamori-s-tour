import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/utility/ScrollToTop';
import HomePage from './pages/HomePage';
import SpotPage from './pages/SpotPage';
import RoutePage from './pages/RoutePage';
import MapPage from './pages/MapPage';
import ThemePage from './pages/ThemePage';
import StoriesPage from './pages/StoriesPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<HomePage />} />
        <Route path="/:lang/spot/:id" element={<SpotPage />} />
        <Route path="/:lang/route" element={<RoutePage />} />
        <Route path="/:lang/map" element={<MapPage />} />
        <Route path="/:lang/theme/:theme" element={<ThemePage />} />
        <Route path="/:lang/stories" element={<StoriesPage />} />
        <Route path="/:lang/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
