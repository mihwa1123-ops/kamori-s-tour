import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpotPage from './pages/SpotPage';

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
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
