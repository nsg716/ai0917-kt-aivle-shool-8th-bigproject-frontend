import { useState } from 'react';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage as SignupPage2 } from './pages/auth/SignupPage2';
import { ManagerDashboard } from './pages/dashboard/ManagerDashboard';
import { AuthorDashboard } from './pages/dashboard/AuthorDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { Routes, Route } from 'react-router-dom';
import RedirectURI from './pages/auth/RedirectURI'; // 경로 확인 필요

type Screen = 'landing' | 'login' | 'signup' | 'dashboard';
type UserType = 'manager' | 'author' | 'admin' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userType, setUserType] = useState<UserType>(null);

  const handleSignInClick = () => {
    setCurrentScreen('login');
  };

  const handleSignupClick = () => {
    setCurrentScreen('signup');
  };

  const handleSignupComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (type: 'manager' | 'author' | 'admin') => {
    setUserType(type);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentScreen('landing');
  };

  const handleGoHome = () => {
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'landing' && (
        <LandingPage onSignInClick={handleSignInClick} />
      )}

      {currentScreen === 'login' && (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setCurrentScreen('landing')}
          onSignup={handleSignupClick}
        />
      )}

      {currentScreen === 'signup' && (
        <SignupPage2
          onSignupComplete={handleSignupComplete}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'dashboard' && userType === 'manager' && (
        <ManagerDashboard onLogout={handleLogout} onHome={handleGoHome} />
      )}

      {currentScreen === 'dashboard' && userType === 'author' && (
        <AuthorDashboard onLogout={handleLogout} onHome={handleGoHome} />
      )}

      {currentScreen === 'dashboard' && userType === 'admin' && (
        <AdminDashboard onLogout={handleLogout} onHome={handleGoHome} />
      )}

      {/* 네이버 콜백용 라우터 (URL이 /auth/naver/callback일 때만 작동) */}
      <Routes>
        <Route
          path="/auth/naver/callback"
          element={<RedirectURI onLoginSuccess={handleLogin} />}
        />
      </Routes>
    </div>
  );
}
