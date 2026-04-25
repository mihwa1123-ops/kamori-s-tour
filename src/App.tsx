import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpotPage from './pages/SpotPage';
import RoutePage from './pages/RoutePage';
import MapPage from './pages/MapPage';
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
      <Routes>
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="/:lang" element={<HomePage />} />
        <Route path="/:lang/spot/:id" element={<SpotPage />} />
        <Route path="/:lang/route" element={<RoutePage />} />
        <Route path="/:lang/map" element={<MapPage />} />
        <Route path="/:lang/stories" element={<StoriesPage />} />
        <Route path="/:lang/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
