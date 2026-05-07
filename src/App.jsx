import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import YummyLayout from './components/layout/YummyLayout';
import LandingPage from './pages/Landing/LandingPage';
import AboutPage from './pages/About/AboutPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/Home/HomePage';
import EnrollPage from './pages/Enroll/EnrollPage';
import UsersPage from './pages/Master/UsersPage';
import TrainingsPage from './pages/Master/TrainingsPage';
import CertificatesPage from './pages/Master/CertificatesPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<YummyLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/certification" element={<ProtectedRoute><EnrollPage /></ProtectedRoute>} />
        <Route path="/master/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
        <Route path="/master/trainings" element={<ProtectedRoute><TrainingsPage /></ProtectedRoute>} />
        <Route path="/master/certificates" element={<ProtectedRoute><CertificatesPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </HashRouter>
  );
}
