import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
import { 
  register, 
  login, 
  logout, 
  getEntries,
  createEntry,
  getEntryById, 
  updateEntry, 
  deleteEntry,
  getEntriesGenres,
  getStats
} from './api/index';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import HomePage from './pages/HomePage';
import EntryDetailPage from './pages/EntryDetailPage';
import StatsPage from './pages/StatsPage';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/entries/:id" element={<EntryDetailPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
