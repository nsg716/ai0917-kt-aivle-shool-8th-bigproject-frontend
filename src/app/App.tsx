import { useEffect, useState, Suspense, lazy } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { authService } from './services/authService';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ensureCsrfToken } from './utils/csrf';

// Code Splitting for performance optimization
const LandingPage = lazy(() =>
  import('./pages/landing/LandingPage').then((module) => ({
    default: module.LandingPage,
  })),
);
const LoginPage = lazy(() =>
  import('./pages/auth/LoginPage').then((module) => ({
    default: module.LoginPage,
  })),
);
const SignupPage = lazy(() =>
  import('./pages/auth/SignupPage').then((module) => ({
    default: module.SignupPage,
  })),
);
const ManagerDashboard = lazy(() =>
  import('./pages/dashboard/ManagerDashboard').then((module) => ({
    default: module.ManagerDashboard,
  })),
);
const AuthorDashboard = lazy(() =>
  import('./pages/dashboard/AuthorDashboard').then((module) => ({
    default: module.AuthorDashboard,
  })),
);
const AdminDashboard = lazy(() =>
  import('./pages/dashboard/AdminDashboard').then((module) => ({
    default: module.AdminDashboard,
  })),
);
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const AILabPage = lazy(() => import('./pages/lab/AILabPage'));

type UserType = 'Manager' | 'Author' | 'Admin' | 'Deactivated' | null;

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default function App() {
  const [userType, setUserType] = useState<UserType>(() => {
    // Only use userRole for initial state to prevent flash, but verification is needed
    const role = localStorage.getItem('userRole') as UserType;
    return role || null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(() => {
    // 저장된 역할이 있으면 검증이 끝날 때까지 로딩 상태 유지 (화면 깜빡임 방지)
    // 저장된 역할이 없으면 바로 랜딩 페이지를 보여줌 (초기 로딩 속도 향상)
    return !!localStorage.getItem('userRole');
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // 앱 초기 진입 시 CSRF 토큰 발급 보장
    ensureCsrfToken();
  }, []);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await authService.me();
        if (user.role) {
          setUserType(user.role);
          localStorage.setItem('userRole', user.role);
        } else {
          // If no role (e.g. pending or anon), consider logged out for dashboard purposes
          setUserType(null);
          localStorage.removeItem('userRole');
        }
      } catch (error) {
        setUserType(null);
        localStorage.removeItem('userRole');
      } finally {
        setIsLoading(false);
      }
    };

    // Verify session on mount
    verifySession();
  }, []);

  const handleLogin = (type: UserType) => {
    localStorage.setItem('userRole', type!);
    setUserType(type);
    navigate('/', { replace: true });
  };

  const handleLogout = async () => {
    // Clear all toasts immediately
    toast.dismiss();
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
    localStorage.removeItem('userRole');
    localStorage.removeItem('msw-session-role'); // Clear MSW session role

    // Navigate first to avoid LandingPage flash
    navigate('/login', { replace: true });

    // Update state in next tick to ensure navigation happened
    setTimeout(() => {
      setUserType(null);
      setIsLoggingOut(false);
    }, 0);
  };

  if (isLoading || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* 권한별 대시보드 */}
            <Route
              path="/"
              element={
                userType === 'Manager' ? (
                  <ManagerDashboard
                    onLogout={handleLogout}
                    onHome={() => navigate('/')}
                  />
                ) : userType === 'Author' ? (
                  <AuthorDashboard
                    onLogout={handleLogout}
                    onHome={() => navigate('/')}
                  />
                ) : userType === 'Admin' ? (
                  <AdminDashboard
                    onLogout={handleLogout}
                    onHome={() => navigate('/')}
                  />
                ) : (
                  <LandingPage onSignInClick={() => navigate('/login')} />
                )
              }
            />

            {/* 인증 라우트 */}
            <Route
              path="/login"
              element={
                userType ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage
                    onLogin={(t) => handleLogin(t)}
                    onBack={() => navigate('/')}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                <SignupPage
                  onSignupComplete={() => navigate('/login')}
                  onBack={() => navigate('/login')}
                />
              }
            />

            {/* 법적 약관 및 404 */}
            <Route path="/lab" element={<AILabPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
