import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { LegalPage } from './pages/LegalPage';
import { BookingProvider } from './context/BookingContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="legal/:slug" element={<LegalPage />} />
          </Route>
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  </StrictMode>
);
