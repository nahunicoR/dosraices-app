import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CatalogoPage } from './pages/CatalogoPage';
import { ListaPreciosPage } from './pages/ListaPreciosPage';

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mayorista" element={<CatalogoPage key="mayorista" modo="mayorista" />} />
        <Route path="/minorista" element={<CatalogoPage key="minorista" modo="minorista" />} />
        <Route path="/catalogo" element={<ListaPreciosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
