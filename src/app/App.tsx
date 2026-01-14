import { useState } from 'react';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ManagerDashboard } from './pages/dashboard/ManagerDashboard';
import { AuthorDashboard } from './pages/dashboard/AuthorDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';

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
        <SignupPage 
          onSignupComplete={handleSignupComplete}
          onBack={() => setCurrentScreen('login')}
        />
      )}
      
      {currentScreen === 'dashboard' && userType === 'manager' && (
        <ManagerDashboard onLogout={handleLogout} />
      )}
      
      {currentScreen === 'dashboard' && userType === 'author' && (
        <AuthorDashboard onLogout={handleLogout} />
      )}
      
      {currentScreen === 'dashboard' && userType === 'admin' && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}